const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

process.noDeprecation = true

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
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
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Portada',
      hash: true,
      template: path.resolve(__dirname, 'src/templates/index.pug')
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
}
