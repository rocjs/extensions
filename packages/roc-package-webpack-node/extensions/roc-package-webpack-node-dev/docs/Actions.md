# Actions for `roc-package-webpack-node-dev`

## Actions
* [roc-abstract-package-base-dev](#roc-abstract-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
* [roc-plugin-babel](#roc-plugin-babel)
  * [babel-config](#babel-config)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [babel-config](#babel-config-1)
  * [build-webpack](#build-webpack)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)
* [roc-package-webpack-node-dev](#roc-package-webpack-node-dev)
  * [build-webpack](#build-webpack-1)
  * [create-watchers](#create-watchers)
  * [get-webpack-targets](#get-webpack-targets)
* [roc-plugin-start](#roc-plugin-start)
  * [register-runtime](#register-runtime)

## roc-abstract-package-base-dev

### after-clean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `after-clean`  
__Have post:__ No  

### before-clean

Runs before clean command is executed. Returns an array of paths that should be removed.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `before-clean`  
__Have post:__ No  

## roc-plugin-babel

### babel-config

Base Babel configuration

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ Yes  

## roc-package-webpack-dev

### babel-config

__Connects to extension:__ Not specified  
__Connects to hook:__ `babel-config`  
__Have post:__ No  

### build-webpack

Adds base Webpack configuration and read webpack from the configuration.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ Yes  

### run-build-command

Build with Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  
__Have post:__ No  

### run-dev-command

Run in development mode using Webpack.

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  
__Have post:__ No  

## roc-package-webpack-node-dev

### build-webpack

Adds configuration needed for building for Node.

__Connects to extension:__ Not specified  
__Connects to hook:__ `build-webpack`  
__Have post:__ No  

### create-watchers

Adds a watcher for automatic reload on change.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `create-watchers`  
__Have post:__ No  

### get-webpack-targets

Adds __node__ as a valid Webpack target.

__Connects to extension:__ `roc-package-webpack-dev`  
__Connects to hook:__ `get-webpack-targets`  
__Have post:__ No  

## roc-plugin-start

### register-runtime

Adds the base runtime. Will resolve node paths and enable source map support.

__Connects to extension:__ `roc-plugin-start`  
__Connects to hook:__ `register-runtime`  
__Have post:__ No  
