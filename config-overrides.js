const webpack = require('webpack');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports =  {
  entry:{
    index:path.resolve(__dirname,'./src/index.js'),
  },
  mode:'development',
  output:{
    publicPath:"/", //Very very important - else, htmlwebackplugin resolve to a relative path and sub routes won't work
    path:path.resolve(__dirname, './dist'),
    filename:'[name].bundle.js'
  },
  resolve:{
    fallback:{
      crypto:require.resolve("crypto-browserify"),
      https:require.resolve("https-browserify"),
      http:require.resolve("stream-http"),
      stream:require.resolve("stream-browserify"),
      zlib:require.resolve("browserify-zlib"),
      fs:false,
      buffer:false
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:path.resolve(__dirname,'./public/index.html'),
      chunks:['index', 'vendor'],
      title:"Home page"
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', ["@babel/preset-env", {"targets": {"node": "current"}}], "@babel/preset-typescript"],
            plugins:["@babel/plugin-proposal-class-properties", ["@babel/plugin-proposal-decorators",{decoratorsBeforeExport:true}]]

          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups:{
        vendor:{
          test:/node_modules/,
          chunks:'all',
          name:"vendor",
          enforce:true
        }
      }
     },
   },
}
