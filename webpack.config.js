const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: isDev ? ['webpack-hot-middleware/client', './webpack/entry.js'] : './webpack/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  target: 'electron-renderer',
  devtool: 'source-map',
  ...isDev && { 
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      noInfo: true,
      inline: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.html$/,
        use: [  
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]

      }
    ]    
  },
  plugins: [
    new CleanWebpackPlugin({ default: ['dist'] }),
    new HtmlWebpackPlugin({template: 'public/index.html'}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src/renderer'),
      'modules': path.resolve(__dirname, 'src/modules'),
    },
    mainFields: ['main', 'browser'], // https://github.com/websockets/ws/issues/1538#issuecomment-504048708
    fallback: { // https://mr-son.tistory.com/153
      fs: false,
      url: require.resolve("url"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
    }
  },
  externals: {
    'sharp': 'commonjs sharp'
  }
}