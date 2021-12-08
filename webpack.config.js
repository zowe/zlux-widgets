

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin-next');


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
        use: [{
          loader: 'html-loader',
          options: {
            esModule: false
          }
        }]
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
        include: root('./src/app/assets/css'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        include: root('./src/app/components'),
        use: [{
          loader: 'css-loader',
          options: {
            exportType: 'string',
            esModule: false
          }
        }]
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

