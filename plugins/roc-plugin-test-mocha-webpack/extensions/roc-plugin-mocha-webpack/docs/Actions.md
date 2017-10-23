# Actions for `roc-plugin-test-mocha-webpack`

## Actions
* [roc-plugin-test-mocha-webpack](#roc-plugin-test-mocha-webpack)
  * [babel-config](#babel-config)
  * [build-webpack](#build-webpack)
  * [run-test-command](#run-test-command)
* [roc-plugin-start](#roc-plugin-start)
  * [register-runtime](#register-runtime)

## roc-plugin-test-mocha-webpack

### babel-config

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ No  

### build-webpack

Adds Webpack configuration specific for tests.

__Connects to extension:__ `roc-plugin-test-mocha-webpack`  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### run-test-command

Adds support for running tests with nyc using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-test-command`  
__Have post:__ No  

## roc-plugin-start

### register-runtime

Adds the base runtime. Will resolve node paths and enable source map support.

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `register-runtime`  
__Have post:__ No  
