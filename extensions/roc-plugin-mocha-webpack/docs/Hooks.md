# Hooks for `roc-plugin-test-mocha-webpack`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-abstract-plugin-test](#roc-abstract-plugin-test)
  * [run-test-command](#run-test-command)
* [roc-plugin-start](#roc-plugin-start)
  * [get-potential-target](#get-potential-target)
  * [register-runtime](#register-runtime)
* [roc-plugin-test-mocha-webpack](#roc-plugin-test-mocha-webpack)
  * [babel-config](#babel-config)
  * [build-webpack](#build-webpack)

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

## roc-abstract-plugin-test

### run-test-command

Use to add things that should react to the build command being called.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments

| Name           | Description | Type            | Required | Can be empty |
| -------------- | ----------- | --------------- | -------- | ------------ |
| targets        |             | `Array(String)` | Yes      | No           |
| managedOptions |             | `Object()`      | Yes      | Yes          |

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

## roc-plugin-test-mocha-webpack

### babel-config

Used to create a Babel configuration to be used in the Webpack build for test.

__Initial value:__ `{}`  
__Expected return value:__ `Object()`

#### Arguments

| Name     | Description                                             | Type      | Required | Can be empty |
| -------- | ------------------------------------------------------- | --------- | -------- | ------------ |
| target   | The target that is used.                                | `String`  | No       | Yes          |
| coverage | If the code should be prepared for coverage generation. | `Boolean` | No       |              |

### build-webpack

Used to create the final Webpack configuration object for tests.

__Initial value:__ `{}`  
__Expected return value:__ `Object()`

#### Arguments

| Name        | Description                                                         | Type       | Required | Can be empty |
| ----------- | ------------------------------------------------------------------- | ---------- | -------- | ------------ |
| target      | The target for which the Webpack configuration should be build for. | `String`   | No       | Yes          |
| babelConfig | The Babel configuration that should be used for the Webpack build.  | `Object()` | No       | Yes          |
