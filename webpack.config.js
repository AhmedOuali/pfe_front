var HtmlWebpackPlugin = require('html-webpack-plugin');
    var RefreshBrowserPlugin = require('refresh-browser-webpack-plugin');

module.exports = {
    entry: './src/index.js', //fichier d'entrée
    output: {
      path: __dirname,
      filename: './public/js/app/bundle.js'  //path of the compiled file
    },
    resolve: {
      root: __dirname,
      alias: {
        App: 'src/app.js',
        exempleOfStatelessComponents: 'src/components/exempleOfStatelessComponents.js',
        actionTypes: 'src/store/actions/actionTypes.js'
      },
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-0']
          },
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/
            },
          { test: /\.css$/, 
            loader: "style-loader!css-loader",
          },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
      ]
    },
    devtool: 'cheap-module-eval-source-map'
  };
  