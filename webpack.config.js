/* eslint-disable */
const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, "index.web.js"), // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: "bundle.js", // string
    // the filename template for entry chunks

    publicPath: "/assets/", // string
    // the url to the output directory resolved relative to the HTML page

    library: "MyLibrary", // string,
    // the name of the exported library

    libraryTarget: "umd", // universal module definition
    // the type of the exported library

    /* Advanced output configuration (click to show) */
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.less$/,
        loader: 'less-loader' // compiles Less to CSS
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "node_modules/react-router-native"),
          path.resolve(__dirname, "node_modules/react-router-native-web"),
          path.resolve(__dirname, "node_modules/react-native-elements"),
          path.resolve(__dirname, "node_modules/react-native-color-wheel"),
          path.resolve(__dirname, "node_modules/react-native-vector-icons"),
          path.resolve(__dirname, "node_modules/react-native-touchable-scale"),
          path.resolve(__dirname, "node_modules/react-native-*"),
          path.resolve(__dirname, "node_modules/victory"),

          // path.resolve(__dirname, "node_modules/react-native-material-ui"),
          // path.resolve(__dirname, "node_modules/react-native-vector-icons"),
          path.resolve(__dirname, "lib"),
        ],
        exclude: [
          //path.resolve(__dirname, "node_modules")
        ],

        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        // issuer: { test, include, exclude },
        // conditions for the issuer (the origin of the import)

        enforce: "pre",
        enforce: "post",
        // flags to apply these rules, even if they are overridden (advanced option)

        loader: "babel-loader",
        query: {
          presets: ['es2015', "react-native"]
        },
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide

        // options: {
        //   // plugins: ["react-native-web"],
        //   presets: ["react-native"],
        //   // presets: ["es2015", "react", "stage-0"]
        // },
        // options for the loader
      },

      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },

      {
        test: /\.html$/,

        use: [
          // apply multiple loaders and options
          "htmllint-loader",
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },
    ]
  },



  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    // directories where to look for modules

    extensions: [".web.js", ".js", ".json", ".jsx", ".css"],
    // extensions that are used

    alias: {
      // a list of module name aliases

      "react-native": "react-native-web",
      "victory-native": "victory",
      "react-router-native": "react-router",
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

    },
    /* alternative alias syntax (click to show) */

    /* Advanced resolve configuration (click to show) */
  },

  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },

  devtool: "source-map", // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: "web", // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // externals: ["react"],
  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: "errors-only",
  // lets you precisely control what bundle information gets displayed

  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      // Can't drop react dev mode for the moment because react-native-elements don't run after..
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__: process.env.NODE_ENV !== 'production',
      __OFFLINE__: true,
    }),
    // new webpack.optimize.UglifyJsPlugin()
  ],
  // list of additional plugins
}


/*
const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, './');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'lib'),
              path.resolve(__dirname, "node_modules/react-router-native"),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Babel configuration (or use .babelrc)
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app.
      plugins: ['react-native-web'],
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['react-native']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

module.exports = {
  // your web-specific entry file
  entry: path.resolve(appDirectory, 'index.web.js'),

  // configures where the build ends up
  output: {
    filename: 'bundle.js',
    path: path.resolve(appDirectory, 'dist')
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV === 'production' || true
    })
  ],

  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [ '.web.js', '.js' ]
  }
}
*/
