const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: path.resolve(__dirname, "src/chrome.tsx"),
    output: {
      filename: "chrome.js",
      path: path.resolve(__dirname, "dist"),
      pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info
      publicPath: ""
    },
    amd: false, // We don't use any AMD modules, helps performance
    mode: isProd ? "production" : "development",
    // Google chrome extensions don't support source maps :(
    ...(!isProd && { devtool: "inline-cheap-module-source-map" }),
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          include: [
            path.join(__dirname, "src"),
            path.join(__dirname, "../dev/src")
          ],
          use: { loader: "ts-loader" },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
        // At the expense of loading times this makes dev easier for now.
        // Maybe we could eventually use a CDN for fonts/images?
        {
          test: /\.(png|jpe?g|webp|gif|svg|woff(2)?|ttf|eot)$/,
          type: 'asset/inline'
        },
        // Quickstarts are yaml?
        {
          test: /\.ya?ml$/,
          use: 'js-yaml-loader',
        }
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "chrome.css",
      }),
      new CleanWebpackPlugin(),
    ],
    stats: "minimal",
  };
};
