const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
const webpack = require("webpack");

dotenv.config({path:__dirname+'/.env'});

module.exports = {
  mode:'none',
  entry : { // 각 html에 필요한 entry 파일
    index : './src/index.js',
    main : './src/main.js'
},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },{
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_bundle.js',
  },
  devServer: {
    port: 5000
  },
  plugins: [
    new HtmlWebpackPlugin({template: './pages/index.html', filename:'./index.html', chunks:['index']}),
    new HtmlWebpackPlugin({template: './pages/main.html', filename:'./main.html', chunks:['main']}),
    new MiniCssExtractPlugin({filename:'[name].css', chunkFilename:'[name].css', linkType: false}),
    new webpack.DefinePlugin({
      'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
      'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      'process.env.TMDB_API_KEY': JSON.stringify(process.env.TMDB_API_KEY),
    })
  ],
  devtool: 'eval-source-map',
};