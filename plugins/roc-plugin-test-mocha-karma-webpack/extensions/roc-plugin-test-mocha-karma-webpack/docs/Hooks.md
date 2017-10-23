# Hooks for `roc-plugin-test-mocha-karma-webpack`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-abstract-plugin-test](#roc-abstract-plugin-test)
  * [run-test-command](#run-test-command)
* [roc-plugin-test-mocha-karma-webpack](#roc-plugin-test-mocha-karma-webpack)
  * [babel-config](#babel-config)
  * [build-karma-config](#build-karma-config)
  * [build-webpack](#build-webpack)

## roc

### update-settings

Expected to return new settings that should be merged with the existing ones.

Makes it possible to modify the settings object before a command is started and after potential arguments from the command line and configuration file have been parsed. This is a good point to default to some value if no was given or modify something in the settings.

__Initial value:__ _Nothing_  
__Expected return value:__ `{}`

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

| Name           | Description | Type       | Required | Can be empty |
| -------------- | ----------- | ---------- | -------- | ------------ |
| targets        |             | `[String]` | Yes      | No           |
| managedOptions |             | `{}`       | Yes      | Yes          |

## roc-plugin-test-mocha-karma-webpack

### babel-config

Used to create a Babel configuration to be used in the Webpack build for test.

__Initial value:__ `{}`  
__Expected return value:__ `{}`

#### Arguments

| Name     | Description                                             | Type      | Required | Can be empty |
| -------- | ------------------------------------------------------- | --------- | -------- | ------------ |
| target   | The target that is used.                                | `String`  | No       | Yes          |
| coverage | If the code should be prepared for coverage generation. | `Boolean` | No       |              |

### build-karma-config

Used to create the final Karma configuration for tests.

__Initial value:__ `{}`  
__Expected return value:__ `{}`

#### Arguments

| Name          | Description                                                                 | Type      | Required | Can be empty |
| ------------- | --------------------------------------------------------------------------- | --------- | -------- | ------------ |
| grep          | RegExp that will be compiled by Mocha and limit what tests that should run. | `String`  | No       | Yes          |
| watch         | If watch mode should be enabled.                                            | `Boolean` | No       |              |
| coverage      | If coverage should be generated.                                            | `Boolean` | No       |              |
| webpackConfig | Webpack configuration to use.                                               | `{}`      | No       | Yes          |

### build-webpack

Used to create the final Webpack configuration object for tests.

__Initial value:__ `{}`  
__Expected return value:__ `{}`

#### Arguments

| Name        | Description                                                         | Type     | Required | Can be empty |
| ----------- | ------------------------------------------------------------------- | -------- | -------- | ------------ |
| target      | The target for which the Webpack configuration should be build for. | `String` | No       | Yes          |
| babelConfig | The Babel configuration that should be used for the Webpack build.  | `{}`     | No       | Yes          |
