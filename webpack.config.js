const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: '[name][ext]'
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    // exclude node_modules
    rules: [
        {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  namedExport: true, //important
                  localIdentName: '[path][name]__[local]',
                }
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
              },
            },
            'sass-loader',
          ],
        },
        { 
          test: /\.(ts|tsx)$/, 
          loader: "ts-loader",
          exclude: /node_modules/,
        },
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],
};




//Loaders

//babel-loader: Transpiles JavaScript and JSX files using Babel, allowing you to use modern JavaScript features and JSX syntax
//Asset Module rule for images:  Handles image files (PNG, SVG, JPG, JPEG, GIF) as assets and emits them to the output directory, allowing you to import images files directly into JS files
//CSS Loader: Processes CSS files, resolving @import and url() statements, and returns CSS code, enabling importing CSS files directly into JS files
//MiniCssExtractPlugin Loader for CSS Files: Extracts CSS into separate files, optimizes performance and reduce size of JS bundle
//CSS Module Rule for SCSS files: Processes SCSS files using CSS Modules, which generates unique class names for CSS selectors, enables scoped styling and prevents style conflicts
//PostCSS loader:  Applies PostCSS transformations to CSS, such as autoprefixing
//SASS loader: Compiles SCSS files into CSS, Allows you to write styles using the Sass preprocessor
//ts-loader: Transpiles TypeScript files into JavaScript, Allows you to write code using TypeScript


//resolve extensions 
//extensions: ['.js', '.jsx', '.ts', '.tsx'] means that webpack will try to resolve module imports without file extensions for JavaScript, JSX, TypeScript, and TSX files.
//This configuration helps simplify imports in your code by allowing you to omit the file extensions when importing modules.


//Plugins

//HTMLWebpackPlugin: This plugin simplifies the creation of HTML files to serve your webpack bundles. It automatically generates an HTML file 
//(or multiple HTML files, if configured) and injects the necessary script tags to include your webpack bundles. 
//You can specify a template HTML file to use as a base, and the plugin will populate it with the appropriate script tags. 
//This is commonly used in webpack configurations to create HTML files that automatically include the bundled JavaScript and CSS files.

//MiniCssExtractPlugin: extracts CSS into separate files from your webpack bundle.
//When you're bundling CSS with webpack, it's typically included directly in the JavaScript bundle using style-loader or css-loader. However, in production, it's often desirable to separate the CSS into its own file for better performance

//Doteenv: This plugin loads environment variables from a .env file into process.env. This is useful for injecting environment-specific configuration into your application at build time. 
//The .env file typically contains key-value pairs of environment variables, which can then be accessed in your code via process.env.


//dev server
//servers as the development server for your application
//static: specifies the directory from which static content will be served
//hot: Hot Module Replacement
//compression: enables gzip compression of assets served by the development server
