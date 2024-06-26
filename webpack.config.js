/* eslint-disable no-undef,@typescript-eslint/no-var-requires */
// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: './src/main.ts',
  output: {

    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    open: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    hot: true,
    headers: {
      // Allow to use SharedBufferArray
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ch.Board Games',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/resources',
          to: 'resources',
        },
      ],
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ogg|mp3)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|fnt|ltr)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

  } else {
    config.mode = 'development';
  }
  return config;
};
