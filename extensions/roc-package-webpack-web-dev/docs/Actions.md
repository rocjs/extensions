# Actions for `roc-package-webpack-web-dev`

## Actions
* [roc-abstract-package-base-dev](#roc-abstract-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [build-webpack](#build-webpack)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)
* [roc-package-webpack-web-dev](#roc-package-webpack-web-dev)
  * [build-webpack](#build-webpack-1)
  * [create-watchers](#create-watchers)
  * [get-webpack-targets](#get-webpack-targets)

## roc-abstract-package-base-dev

### after-clean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `after-clean`  

### before-clean

Runs before clean command is executed. Returns an array of paths that should be removed.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `before-clean`  

## roc-package-webpack-dev

### build-webpack

Adds base Webpack configuration and read webpack from the configuration.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

### run-build-command

Build with Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  

### run-dev-command

Run in development mode using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  

## roc-package-webpack-web-dev

### build-webpack

Adds configuration need for web builds for Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  

### create-watchers

Adds a web watcher using Webpack Dev Server.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  

### get-webpack-targets

Adds __web__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  
