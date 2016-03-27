# Actions for `roc-package-module-dev`

## Actions
* [roc-package-base-dev](#roc-package-base-dev)
  * [afterClean](#afterClean)
  * [beforeClean](#beforeClean)
* [roc-package-module-dev](#roc-package-module-dev)
  * [babelPresets](#babelPresets)
  * [build](#build)
  * [dev](#dev)

## roc-package-base-dev

### afterClean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-package-base-dev`  
__Connects to hook:__ `after-clean`  

### beforeClean

Runs before clean command is executed. Returns an array of strings that should be removed.

__Connects to extension:__ `roc-package-base-dev`  
__Connects to hook:__ `before-clean`  

## roc-package-module-dev

### babelPresets

Will add either babel-preset-es2015 (for es5) or babel-preset-es2015-webpack (for es6).

__Connects to extension:__ `roc-package-module-dev`  
__Connects to hook:__ `babel-load-presets`  

### build

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  

### dev

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  
