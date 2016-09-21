# Actions for `roc-plugin-test-mocha-webpack`

## Actions
* [roc-package-base-dev](#roc-package-base-dev)
  * [afterClean](#afterClean)
  * [beforeClean](#beforeClean)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [build](#build)
  * [dev](#dev)
  * [webpack](#webpack)
* [roc-plugin-test-mocha-webpack](#roc-plugin-test-mocha-webpack)
  * [mocha](#mocha)
  * [mochaWebpack](#mochaWebpack)
  * [resolver](#resolver)

## roc-package-base-dev

### afterClean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-package-base-dev`  
__Connects to hook:__ `after-clean`  

### beforeClean

Runs before clean command is executed. Returns an array of strings that should be removed.

__Connects to extension:__ `roc-package-base-dev`  
__Connects to hook:__ `before-clean`  

## roc-package-webpack-dev

### build

Build with Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  

### dev

Run in development mode using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  

### webpack

Adds base Webpack configuration.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

## roc-plugin-test-mocha-webpack

### mocha

Adds support for running tests with nyc using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-test-command`  

### mochaWebpack

Adds Webpack configuration specific for tests.

__Connects to extension:__ `roc-plugin-test-mocha-webpack`  
__Connects to hook:__ `build-webpack`  

### resolver

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `get-resolve-paths`  
