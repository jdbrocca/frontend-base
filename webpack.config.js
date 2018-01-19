const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

process.noDeprecation = true

const isProd = process.env.NODE_ENV === 'production'
const cssDev = [
  { loader: 'style-loader' },
  { loader: 'css-loader' },
  { loader: 'postcss-loader' },
  { loader: 'sass-loader' }
]
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    { loader: 'css-loader' },
    { loader: 'postcss-loader' },
    { loader: 'sass-loader'}
  ],
  publicPath: '/dist'
})
const cssConfig = isProd ? cssProd : cssDev

const config = {
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
        use: cssConfig
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
    new HtmlWebpackPlugin({
      title: 'Portada',
      template: path.resolve(__dirname, 'src/templates/index.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'Quienes Somos',
      hash: true,
      filename: 'quienes_somos.html',
      template: path.resolve(__dirname, 'src/templates/quienes_somos.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'Servicios',
      hash: true,
      filename: 'servicios.html',
      template: path.resolve(__dirname, 'src/templates/servicios.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'Equipamiento',
      hash: true,
      filename: 'equipamiento.html',
      template: path.resolve(__dirname, 'src/templates/equipamiento.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'Certificados y Autorizaciones',
      hash: true,
      filename: 'certificados_autorizaciones.html',
      template: path.resolve(__dirname, 'src/templates/certificados_autorizaciones.pug')
    }),
    new HtmlWebpackPlugin({
      title: 'Clientes Satisfechos',
      hash: true,
      filename: 'clientes_satisfechos.html',
      template: path.resolve(__dirname, 'src/templates/clientes_satisfechos.pug')
    })
  ]
}

if (isProd) {
  config.plugins.push(
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  )
} else {
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    open: true,
    hot: true,
    stats: 'errors-only'
  }

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = config
