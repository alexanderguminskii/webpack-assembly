const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getSprites = () => {
  const sprites = `
    <g> 
      <symbol id="mail" viewBox="0 0 24 24" >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z" />
      </symbol>
    </g>
    <g> 
      <symbol id="mail" viewBox="0 0 24 24" >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z" />
      </symbol>
    </g>
  `
  return sprites
}

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
      sprites: getSprites(),
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
