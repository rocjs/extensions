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
  * [build-webpack](#build-webpack)

## roc

### update-settings

Expected to return new settings that should be merged with the existing ones.

__Initial value:__ _Nothing_  
__Expected return value:__ `{}`

#### Arguments
| Name        | Description                                                                  | Type       | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------- | ---------- | -------- | ------------ |
| getSettings | A function that returns the settings after the context has been initialized. | `Function` | No       | Yes          |

## roc-abstract-plugin-test

### run-test-command

Use to add things that should react to the build command being called.

__Initial value:__ _Nothing_  
__Expected return value:__ _Nothing_

#### Arguments
| Name          | Description | Type       | Required | Can be empty |
| ------------- | ----------- | ---------- | -------- | ------------ |
| targets       |             | `[String]` | Yes      | No           |
| parsedOptions |             | `{}`       | Yes      | Yes          |

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
| verbose |             | `Boolean` | No       | Yes          |

## roc-plugin-test-mocha-webpack

### build-webpack

Used to create the final Webpack configuration object for tests.

__Initial value:__ `{}`  
__Expected return value:__ `{}`

#### Arguments
| Name     | Description                                                         | Type      | Required | Can be empty |
| -------- | ------------------------------------------------------------------- | --------- | -------- | ------------ |
| target   | The target for which the Webpack configuration should be build for. | `String`  | No       | Yes          |
| coverage | If the code should be prepared for coverage generation.             | `Boolean` | No       | Yes          |
