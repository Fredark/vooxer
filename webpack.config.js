const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const BrowserSyncPlugin  = require('browser-sync-webpack-plugin');
const UglifyJsPlugin     = require('uglifyjs-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
    SVG: path.resolve(__dirname, 'src/'),
    URL: `${package.name}.loja.biz`
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
            proxy: paths.URL,
            serveStatic:[{
                route: `/media/interface/${vars.THEME}/css`,
                dir: 'dist'
            },{
                route: `/media/interface/${vars.THEME}/js`,
                dir: 'dist'
            }]

        }),
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