# Hooks for `roc-package-module-dev`

## Hooks
* [roc-package-base-dev](#roc-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)
* [roc-package-module-dev](#roc-package-module-dev)
  * [babel-load-plugins](#babel-load-plugins)
  * [babel-load-presets](#babel-load-presets)

## roc-package-base-dev

### after-clean

Hook point for adding code that runs after the clean command is invoked.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

### before-clean

Hook point for adding code that runs before the clean command is invoked.

__Initial value:__ _Nothing_  
__Expected return value:__ `[String]`

### run-build-command

Use to add things that should react to the build command being called.

__Initial value:__ _Nothing_  
__Expected return value:__ `Function`

#### Arguments

| Name    | Description                                                                            | Type       |
| ------- | -------------------------------------------------------------------------------------- | ---------- |
| targets | The targets to build for, will be based on settings or a possible argument if defined. | `[String]` |

### run-dev-command

Use to add things that should react to the dev command being called.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name    | Description                                                                           | Type       |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| targets | The targets use for dev, will be based on settings or a possible argument if defined. | `[String]` |

## roc-package-module-dev

### babel-load-plugins

Expected to return a concatenated array with the final presets to use.

__Initial value:__ `[]`  
__Expected return value:__ `[String]`

#### Arguments

| Name   | Description                                       | Type     |
| ------ | ------------------------------------------------- | -------- |
| target | The target, will by default be either es5 or es6. | `String` |

### babel-load-presets

Expected to return a presets to add to the array of presets to use.

__Initial value:__ `[]`  
__Expected return value:__ `[String]`

#### Arguments

| Name   | Description                                       | Type     |
| ------ | ------------------------------------------------- | -------- |
| target | The target, will by default be either es5 or es6. | `String` |
