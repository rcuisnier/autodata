import {resolve} from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import rules from './webpack.loaders';
import ENV from './ENV.json';

const {NODE_ENV = 'dev', LOCAL = false} = process.env;

// Format vars for webpack ENV process
const formatVars = (VARS) => {
  const obj = {};
  Object.entries(VARS).forEach(([name, value]) => {
    obj[name] = typeof value === 'string' ? JSON.stringify(value) : value;
  });
  return obj;
};

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: NODE_ENV === 'dev',
    __ENV__: LOCAL ? {
      ...formatVars(ENV),
    } : false,
  }),
];
let entry = {
  autodata: './src/autodata.js',
};

if (LOCAL) {
  entry = {
    demo: './src/demo/demo.jsx',
  };
  plugins = plugins.concat([
    new HTMLWebpackPlugin({
      title: 'Autodata',
      template: './src/demo/index.html',
      inject: 'body',
      chunksSortMode: 'none',
    }),
  ]);
}

if (NODE_ENV === 'prod') {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
  ]);
}

export default {
  entry,
  output: {
    path: resolve(`${__dirname}/dist`),
    filename: NODE_ENV === 'prod' ? '[name].min.js' : '[name].js',
    library: 'autoData',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules,
  },
  plugins,
};
