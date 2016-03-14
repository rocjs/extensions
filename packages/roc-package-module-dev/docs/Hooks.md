# Hooks for `roc-package-module-dev`

## Hooks
* [roc-package-core-dev](#roc-package-core-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
* [roc-package-module-dev](#roc-package-module-dev)
  * [babel-load-plugins](#babel-load-plugins)
  * [babel-load-presets](#babel-load-presets)

## roc-package-core-dev

### after-clean

Hook point for adding code that runs after the clean command is invoked.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

### before-clean

Hook point for adding code that runs before the clean command is invoked.

__Initial value:__ _Nothing_  
__Expected return value:__ `[String]`

#### Arguments

| Name     | Description                                    | Type |
| -------- | ---------------------------------------------- | ---- |
| settings | The settings object that is received from Roc. | `{}` |

## roc-package-module-dev

### babel-load-plugins

Expected to return a concatenated array with the final presets to use.

__Initial value:__ `[]`  
__Expected return value:__ `[String]`

#### Arguments

| Name   | Description                            | Type     |
| ------ | -------------------------------------- | -------- |
| target | The target, will be either es5 or es6. | `String` |

### babel-load-presets

Expected to return a presets to add to the array of presets to use.

__Initial value:__ `[]`  
__Expected return value:__ `String / [String]`

#### Arguments

| Name   | Description                            | Type     |
| ------ | -------------------------------------- | -------- |
| target | The target, will be either es5 or es6. | `String` |

