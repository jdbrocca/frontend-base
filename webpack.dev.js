const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

process.noDeprecation = true

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    filename: '[name].[hash].js'
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'i/',
              publicPath: '../'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      {
        test: /\.(woff|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Portada',
      template: path.resolve(__dirname, 'src/index.pug')
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9001,
      proxy: 'http://localhost:9000/'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}