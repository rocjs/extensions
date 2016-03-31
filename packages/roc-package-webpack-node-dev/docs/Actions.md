# Actions for `roc-package-webpack-node-dev`

## Actions
* [roc-plugin-start](#roc-plugin-start)
  * [runtime](#runtime)
* [roc-package-base-dev](#roc-package-base-dev)
  * [afterClean](#afterClean)
  * [beforeClean](#beforeClean)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [build](#build)
  * [dev](#dev)
  * [webpack](#webpack)
* [roc-package-webpack-node-dev](#roc-package-webpack-node-dev)
  * [target](#target)
  * [watcher](#watcher)
  * [webpack](#webpack)

## roc-plugin-start

### runtime

Adds the base runtime. Will resolve node paths and enable source map support.

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `register-runtime`  

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

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `build-webpack`  

## roc-package-webpack-node-dev

### target

Adds __node__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  

### watcher

Adds a watcher for automatic reload on change.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  

### webpack

Adds configuration needed for building for Node.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `build-webpack`  
