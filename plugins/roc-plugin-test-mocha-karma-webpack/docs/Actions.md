# Actions for `roc-plugin-test-mocha-karma-webpack`

## Actions
* [roc-plugin-test-mocha-karma-webpack](#roc-plugin-test-mocha-karma-webpack)
  * [babel-config](#babel-config)
  * [build-karma-config](#build-karma-config)
  * [build-webpack](#build-webpack)
  * [run-test-command](#run-test-command)

## roc-plugin-test-mocha-karma-webpack

### babel-config

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ No  

### build-karma-config

Builds the default Karma configuration

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-karma-config`  
__Have post:__ No  

### build-webpack

Adds Webpack configuration specific for tests. Will provide an alias for the src directory, meaning that it is possible to use "src/" as a root for the resolving.

__Connects to extension:__ `roc-plugin-test-mocha-karma-webpack`  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### run-test-command

Adds support for running tests with Karma using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-test-command`  
__Have post:__ No  
