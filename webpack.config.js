const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx", // 파일을 찾기 시작하는 입구
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"], // import from 뒤에 확장자를 생략했을 때, 어떤 확장자가 올 수 있는지 알려주는 역할.
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node-modules/,
        use: "babel-loader", //js와 jsx 파일을 가져오는 loader입니다.
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"], //style과 css 파일을 가져오는 loader같군요?
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"), // 번들이 만들어질 폴로 경로
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public/", to: "assets/" }],
    }), // public 폴더의 내용을 dist 폴더로 복사
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    host: "localhost",
    port: 3000,
  },
};
