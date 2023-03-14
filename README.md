## Introduction  
Webpack + React + Typescript + Electron Boilerplate that supports HMR. It is created with minimal settings to scale up and down as needed.  
  

## Branch
`Master` branch is used to create a single app.   
`Updater` branch is used when automatic updates are required, and files about publishing need to be modified.   
`Extra` branch is used when a built file that has already been manufactured needs to be turned into an app. Can merge it as needed.

## Install Command
```
npm install
```

## Development Command
```
npm run dev
```

## Build Command
```
npm run build
```

## Build Setting
Open to file `package.json`, Change product name and app Id
```json
  // ...
  "build": {
    "productName": "Product Name",
    "appId": "app.id",
    "directories": {
      "output": "build"
    },
    "files": [
      "dist/**/*",
      "src/**/*"
    ],
    "win": {
      "publisherName": "Product Name",
      "icon": "public/icon.ico"
    }
  }
```

## Package

### devDependencies
|name|version|
|:---|:---|
|@babel/core|7.20.12|
|@babel/preset-env|7.20.2|
|@babel/preset-react|7.18.6|
|@babel/preset-typescript|7.18.6|
|@types/qrcode|1.5.0|
|@types/react|18.0.26|
|@types/react-dom|18.0.10|
|@types/sharp|0.31.1|
|@types/styled-components|5.1.26|
|babel-loader|9.1.2|
|clean-webpack-plugin|4.0.0|
|cross-env|7.0.3|
|crypto-browserify|3.12.0|
|css-loader|6.7.3|
|dotenv|16.0.3|
|electron|22.0.1|
|electron-builder|23.6.0|
|express|4.18.2|
|html-loader|4.2.0|
|html-webpack-plugin|5.5.0|
|https-browserify|1.0.0|
|mini-css-extract-plugin|2.7.2|
|os-browserify|0.3.0|
|path-browserify|1.0.1|
|sass|1.57.1|
|sass-loader|13.2.0|
|stream-browserify|3.0.0|
|stream-http|3.2.0|
|style-loader|3.3.1|
|ts-loader|9.4.2|
|ts-node|10.9.1|
|url|0.11.0|
|webpack|5.75.0|
|webpack-cli|5.0.1|
|webpack-dev-middleware|5.3.3|
|webpack-hot-middleware|2.25.2|

### dependencies
|name|version|
|:---|:---|
|axios|1.2.2|
|iconv-lite|0.6.3|
|os-paths|7.3.0|
|react|18.2.0|
|react-dom|18.2.0|
|react-router-dom|6.6.2|
|react-transition-group|4.4.5|
|styled-components|5.3.6|