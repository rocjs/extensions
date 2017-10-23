# Actions for `roc-package-module-dev`

## Actions
* [roc-abstract-package-base-dev](#roc-abstract-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
* [roc-plugin-babel](#roc-plugin-babel)
  * [babel-config](#babel-config)
* [roc-package-module-dev](#roc-package-module-dev)
  * [babel-config](#babel-config-1)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)

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

## roc-package-module-dev

### babel-config

Adds babel-preset-latest with either modules enabled or not depending on the target

__Connects to extension:__ `roc-package-module-dev`  
__Connects to hook:__ `babel-config`  
__Have post:__ No  

### run-build-command

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-build-command`  
__Have post:__ No  

### run-dev-command

__Connects to extension:__ Not specified  
__Connects to hook:__ `run-dev-command`  
__Have post:__ No  
