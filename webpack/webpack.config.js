const path = require("path");

module.exports = {
  entry: "./src/plugin.ts",
  module: {
    rules: [
      // scss
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      // typescript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "chapter-thumbnail-picker.min.js",
    path: path.resolve(path.join(__dirname, '..'), "dist"),
  },
};
