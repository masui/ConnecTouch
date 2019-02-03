const path = require("path");
const webpack = require("webpack");
const env =
  process.env.NODE_ENV === "production" ? process.env.NODE_ENV : "development";

module.exports = {
  mode: env,
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"])],
  module: {
    rules: [
      {
        test: /\.(mp4|png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
