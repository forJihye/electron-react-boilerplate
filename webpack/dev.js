const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config');

const {spawn} = require('child_process');
const express = require('express');
const path = require('path');
const net = require('net');

let PORT = 0;

const compiler = webpack(webpackConfig);
compiler.hooks.done.tap('ProgressPlugin', (context, entry) => {
  console.clear();
  console.log(`\nServer running at : http://localhost:${PORT}\n`);
});

const getPort = () => new Promise(resolve => {
  const server = net.createServer(socket => socket.end('Hello world\n'));
  server.listen(0, () => {
    resolve(server.address().port);
    server.close();
  });
});

const app = express();
const run = (port) => {
  app.use(webpackDevMiddleware(compiler, { stats: 'minimal' }));
  app.use(webpackHotMiddleware(compiler));
  app.use('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(path.join(compiler.outputPath, 'index.html'), (err, result) => {
      if (err) return next(err);
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });
  app.listen(port, () => {
    spawn('electron', ['.', String(port)], {shell: true, env: process.env, stdio: 'inherit'})
      .on('data', data => console.log(data))
      .on('close', data => process.exit(0))
      .on('error', data => console.error(data));
  });
}

const main = async () => { try {
  PORT = await getPort().catch(() => { throw Error('fail run')});
  run(PORT);
} catch (error) {
  console.error(error)
}}
main();