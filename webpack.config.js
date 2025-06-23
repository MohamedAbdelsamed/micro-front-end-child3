const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3003/',
  },
  mode: 'development',
  devServer: {
  port: 3003,
  headers: {
    'Access-Control-Allow-Origin': '*', // or restrict to http://localhost:3000
  },
  hot: true,
  historyApiFallback: true,
},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ModuleFederationPlugin({
     name: 'microfrontend3',
  filename: 'remoteEntry.js',
    exposes: {
    './App': './src/App', // <-- EXPOSE this file
    './SecondChild': './src/second-child-comp.jsx' // <--- THIS IS IMPORTANT
  },
   remotes: {
    host_app: 'host_app@http://localhost:3000/remoteEntry.js',
  },
shared: {
  react: {
    singleton: true,
    requiredVersion: '^19.1.0',
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^19.1.0',
  },
  'react-i18next': {
    singleton: true,
    requiredVersion: '^13.0.0',
  },
  i18next: {
    singleton: true,
    requiredVersion: '^23.0.0',
  },
}

    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
