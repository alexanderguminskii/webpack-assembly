const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: "./src/ts/index.ts",
  },
  output: {
    filename: './js/[name].[hash].js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  devServer: {
    port: 9000,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },
    client: {
      overlay: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'project.html',
      template: './src/templates/project.html',
    }),

    new CopyPlugin({
      patterns: [
        { from: "./src/fonts", to: "fonts" },
        { from: "./src/img", to: "img" },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash].css',
    }),
  ],
};
