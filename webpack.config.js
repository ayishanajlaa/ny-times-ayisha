const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env file
const env = dotenv.config().parsed || {};

// Create a new object with stringified values
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // Ensure proper routing
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Ensures correct HTML file is used
    }),
    // Add the environment variables plugin
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      ...envKeys
    }),
  ],
  devServer: {
    static: path.join(__dirname, "public"), // Serve from the public folder
    historyApiFallback: true, // Fixes "Cannot GET /some-route"
    compress: true,
    port: 8080,
  },
};