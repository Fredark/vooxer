const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const BrowserSyncPlugin  = require('browser-sync-webpack-plugin');
const UglifyJsPlugin     = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin')

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
    SVG: path.resolve(__dirname, 'src/')
}

const vars = {
    THEME: package.theme
}


module.exports = {
    entry: path.join(paths.JS, 'scripts.js'),
    output: {
        path: paths.DIST,
        filename: 'general.js'
    },
    plugins: [
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          server: { baseDir: ['dist'] }
        }),
        new HtmlWebpackPlugin({
          template: './src/html/index.pug'
        }),
        new CopyWebpackPlugin([
          {
            from: 'src/img',
            to: 'img/[name].[ext]',
            toType: 'template'
          }
        ]),
        new ExtractTextPlugin('general.css'),
        new SpriteLoaderPlugin({ plainSprite: true }),
        new UglifyJsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    'pug-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: { extract: true }
                    },
                    'svgo-loader'
                ]
            },
            {
              test: /\.(gif|png|jpe?g|svg)$/i,
              use: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                      quality: 75
                    }
                  }
                },
              ],
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                stylus: {
                                    preferPathResolver: 'webpack'
                                }
                            }
                        }
                    ]
                })
            },

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.styl']
    }

}
