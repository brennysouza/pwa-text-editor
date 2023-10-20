const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  // Webpack mode set to development for easier debugging.
  return {
    mode: 'development',
    entry: {
      // Entry point for the main index JavaScript.
      main: './src/js/index.js',
      // Entry point for the install JavaScript.
      install: './src/js/install.js'
    },
    output: {
      // Output for main and install bundle javascript files
      filename: '[name].bundle.js',
      // Output directory for bundled files.
      path: path.resolve(__dirname, 'dist'),
    },
    // Generates an HTML file 
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),

      // TODO: Add and configure workbox plugins for a service worker and manifest file.
      // Generates a service worker file
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // Generates a service worker file
      // Generates a manifest file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Text Editor",
        short_name: "Text",
        description: "Please Save Notes Here!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            // May need to add more sizes for logo/icon
            sizes: [90, 130, 190, 260, 390, 500],
            destination: path.join("icons"),
          },
        ],
      }),
    ],

    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel-loader 
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime",],
            },
          },
        },
      ],
    },
  };
};
