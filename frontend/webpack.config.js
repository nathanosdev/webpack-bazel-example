const path = require('path');
const isProd = process.env.NODE_ENV == 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  mode: isProd ? 'production' : 'development',
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.html', '.svelte', '.ts', '.js'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },

  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'svelte-loader',
            options: {
              preprocess: sveltePreprocess({}),
              emitCss: false,
              compilerOptions: {
                css: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
