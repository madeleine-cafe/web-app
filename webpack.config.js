const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new HtmlWebpackPlugin({
      filename: 'compte/index.html',
      template: path.resolve(__dirname, "src", "compte/index.html")
    }),
    new HtmlWebpackPlugin({
      filename: 'contact/index.html',
      template: path.resolve(__dirname, "src", "contact/index.html")
    }),
    new HtmlWebpackPlugin({
      filename: 'privacy/index.html',
      template: path.resolve(__dirname, "src", "privacy/index.html")
    }),
    new HtmlWebpackPlugin({
      filename: 'conduite/index.html',
      template: path.resolve(__dirname, "src", "conduite/index.html")
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    })
  ],
  module: {
    rules: [
        {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
            },
        },
        {
            test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
            loader: require.resolve('file-loader'),
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
            },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};