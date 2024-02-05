// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PLUGINS = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
];

const RULES = [
  {
    use: {
      loader: 'babel-loader',
    },
    exclude: /node_modules/,
    test: /\.(ts|tsx)$/,
  },
  {
    use: ['style-loader', 'css-loader', 'sass-loader'],
    test: /\.(sa|sc|c)ss$/,
  },
];

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.json'];

// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
    },
    port: 5000,
  },
  resolve: {
    extensions: EXTENSIONS,
  },
  module: {
    rules: RULES,
  },
  entry: './src/index.tsx',
  plugins: PLUGINS,
};
