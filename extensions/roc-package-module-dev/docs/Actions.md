# Actions for `roc-package-module-dev`

## Actions
* [roc-abstract-package-base-dev](#roc-abstract-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
* [roc-package-module-dev](#roc-package-module-dev)
  * [babel-load-presets](#babel-load-presets)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)

## roc-abstract-package-base-dev

### after-clean

Runs after clean command is executed. Logs that the action has been completed successfully.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `after-clean`  

### before-clean

Runs before clean command is executed. Returns an array of paths that should be removed.

__Connects to extension:__ `roc-abstract-package-base-dev`  
__Connects to hook:__ `before-clean`  

## roc-package-module-dev

### babel-load-presets

Will add either babel-preset-es2015 (for es5) or babel-preset-es2015-webpack (for es6).

__Connects to extension:__ `roc-package-module-dev`  
__Connects to hook:__ `babel-load-presets`  

### run-build-command

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  

### run-dev-command

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  
