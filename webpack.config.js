

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

var webpack = require('webpack');
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const { AngularWebpackPlugin } =  require('@ngtools/webpack');


function root(__path) {
  return path.join(__dirname, __path);
};

var config = {
  entry: [root('./src/app/index.ts')],
  devtool: 'source-map',
  mode: 'development',
  output: {
    path: root('.'),
    filename: './dist/index.js',
    library: '@zlux/widgets',
    libraryTarget: 'amd',
    umdNamedDefine: true
  },
  externals: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/forms',
    'rxjs',
    'rxjs/operators'
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          'ts-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [ 'html-loader' ]
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'
      },
      {
        /* External (or inline) file loader */
        test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        exclude: root('./src/app'),
        use: [MiniCssExtractPlugin.loader, "style-loader"],
      },
      {
        test: /\.css$/,
        include: root('./src/app/assets/css'),
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.css$/,
        include: root('./src/app/components'),
        use: ['to-string-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.ts']
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "styles.css" }),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/]
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: '**/*.metadata.json',
        to: './dist',
        context: './out_tsc/src/app/'
      }]
    }),
    new WebpackShellPlugin({
      onBuildStart: ['npm run metadata']
    })
  ]
};

module.exports = config;


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

  SPDX-License-Identifier: EPL-2.0

  Copyright Contributors to the Zowe Project.
*/

