# Hooks for `roc-package-webpack-node-dev`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-abstract-package-base-dev](#roc-abstract-package-base-dev)
  * [after-clean](#after-clean)
  * [before-clean](#before-clean)
  * [run-build-command](#run-build-command)
  * [run-dev-command](#run-dev-command)
* [roc-package-webpack-dev](#roc-package-webpack-dev)
  * [babel-config](#babel-config)
  * [build-webpack](#build-webpack)
  * [create-watchers](#create-watchers)
  * [get-webpack-targets](#get-webpack-targets)
* [roc-package-webpack-node-dev](#roc-package-webpack-node-dev)
  * [dev-process-created](#dev-process-created)
  * [dev-process-stopping](#dev-process-stopping)
* [roc-plugin-start](#roc-plugin-start)
  * [get-potential-target](#get-potential-target)
  * [register-runtime](#register-runtime)

## roc

### update-settings

Expected to return new settings that should be merged with the existing ones.

Makes it possible to modify the settings object before a command is started and after potential arguments from the command line and configuration file have been parsed. This is a good point to default to some value if no was given or modify something in the settings.

__Initial value:__ _Nothing_  
__Expected return value:__ `Object()`

#### Arguments

| Name        | Description                                                                  | Type       | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------- | ---------- | -------- | ------------ |
| getSettings | A function that returns the settings after the context has been initialized. | `Function` | No       |              |

## roc-abstract-package-base-dev

### after-clean

Hook point for adding code that runs after the clean command is invoked.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

### before-clean

Hook point for adding code that runs before the clean command is invoked.

__Initial value:__ _Nothing_  
__Expected return value:__ `Array(String)`

### run-build-command

Use to add things that should react to the build command being called.

__Initial value:__ _Nothing_  
__Expected return value:__ `Function`

#### Arguments

| Name    | Description                                                                            | Type            | Required | Can be empty |
| ------- | -------------------------------------------------------------------------------------- | --------------- | -------- | ------------ |
| targets | The targets to build for, will be based on settings or a possible argument if defined. | `Array(String)` | Yes      | No           |

### run-dev-command

Use to add things that should react to the dev command being called.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name    | Description                                                                           | Type            | Required | Can be empty |
| ------- | ------------------------------------------------------------------------------------- | --------------- | -------- | ------------ |
| targets | The targets use for dev, will be based on settings or a possible argument if defined. | `Array(String)` | Yes      | No           |

## roc-package-webpack-dev

### babel-config

Used to create a Babel configuration to be used in the Webpack build.

__Initial value:__ `{}`  
__Expected return value:__ `Object()`

#### Arguments

| Name   | Description              | Type     | Required | Can be empty |
| ------ | ------------------------ | -------- | -------- | ------------ |
| target | The target that is used. | `String` | No       | Yes          |

### build-webpack

Used to create the final Webpack configuration object.

__Initial value:__ `{}`  
__Expected return value:__ `Object()`

#### Arguments

| Name        | Description                                                         | Type       | Required | Can be empty |
| ----------- | ------------------------------------------------------------------- | ---------- | -------- | ------------ |
| target      | The target for which the Webpack configuration should be build for. | `String`   | No       | Yes          |
| babelConfig | The Babel configuration that should be used for the Webpack build.  | `Object()` | No       | Yes          |

### create-watchers

Used to add watchers that should follow a specific format.

__Initial value:__ `{}`  
__Expected return value:__ `Object(Function)`

### get-webpack-targets

Used to inform which targets that should be considered as Webpack targets. Actions should concat the previousValue to build the complete value.

__Initial value:__ `[]`  
__Expected return value:__ `Array(String)`

## roc-package-webpack-node-dev

### dev-process-created

Used to react to when the development server has started.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name          | Description                 | Type | Required | Can be empty |
| ------------- | --------------------------- | ---- | -------- | ------------ |
| serverProcess | The created server process. |      | No       |              |

### dev-process-stopping

Used to react before the development server is stopped.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name          | Description                               | Type | Required | Can be empty |
| ------------- | ----------------------------------------- | ---- | -------- | ------------ |
| serverProcess | The server process that is being stopped. |      | No       |              |

## roc-plugin-start

### get-potential-target

Use to define for what target that it should try to find a resource for too start with.

__Initial value:__ `"node"`  
__Expected return value:__ `String`

### register-runtime

Can be used to modify the runtime before an application starts.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name    | Description | Type      | Required | Can be empty |
| ------- | ----------- | --------- | -------- | ------------ |
| verbose |             | `Boolean` | No       |              |
