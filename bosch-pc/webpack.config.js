var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const salad = require('postcss-salad')({
  browser: ['ie > 8', 'last 2 version'],
  features: {
    'bem': {
      'shortcuts': {
        'component': 'b',
        'modifier': 'm',
        'descendent': 'e'
      },
      'separators': {
        'descendent': '__',
        'modifier': '--'
      }
    }
  }
})

var basePath = '/'
// if(process.env.NODE_ENV == 'stage'){
//     basePath = '/front-mis/'
// }

module.exports = {
    entry: {
        app: './src/main.js',
        vue: ['vue','vue-resource','vue-router','vuex'],
        element: ['element-ui'],
        vendor: ['lodash','moment','crypto-js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: basePath ,
        filename: "js/[name].[hash:8].js"
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
              loader: 'vue-loader',
            options: {
              // vue-loader options go here
            }
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
          {
            test: /\.css$/,
            exclude: [
              path.resolve(__dirname, "src/postcss")
            ],
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
          },
          {
            test: /\.css$/,
            include: [
              path.resolve(__dirname, "src/postcss")
            ],
            //loader: "style-loader!css-loader!postcss-loader"
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader:[ 'css-loader','postcss-loader'] })
          },
          {
              test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
              loader: "file-loader",
              options: {
                  name: 'assets/fonts/[name]-[hash].[ext]'
              }
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                  name: 'assets/images/[name].[ext]?[hash]'
              }
          },
            {
                test: /\.*$/,
                loader: "file-loader",
                include: [
                    path.resolve(__dirname, "src/assets/files")
                ],
                options: {
                    name: 'assets/files/[name].[ext]'
                }
            }
        ]
    },
    plugins:[
      new webpack.LoaderOptionsPlugin({
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "src/postcss")
        ],
        options: {
          postcss: function () {
            return [salad];
          }
        }
      }),
      new ExtractTextPlugin({
          filename: 'css/style.[contenthash:8].css',
          disable: false,
          allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: ['vue','element','vendor'],
          minChunks: Infinity
      }),

      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: __dirname + '/src/index.html',
          favicon: __dirname + '/src/assets/Favicon.ico',
          inject: true,
          chunks: ['vue','element','vendor','app'],
          chunksSortMode: 'dependency'
      })
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test'
  || process.env.NODE_ENV === 'stage' || process.env.NODE_ENV === 'demo') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

