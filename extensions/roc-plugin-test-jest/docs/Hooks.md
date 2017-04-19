# Hooks for `roc-plugin-test-jest`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-abstract-plugin-test](#roc-abstract-plugin-test)
  * [run-test-command](#run-test-command)
* [roc-plugin-test-jest](#roc-plugin-test-jest)
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

## roc-plugin-test-jest

### babel-config

Used to create a Babel configuration to be used with Jest.

__Initial value:__ `{}`  
__Expected return value:__ `Object()`

#### Arguments

| Name   | Description              | Type     | Required | Can be empty |
| ------ | ------------------------ | -------- | -------- | ------------ |
| target | The target that is used. | `String` | No       | Yes          |

### build-webpack

Used to create a Babel configuration to be used with Jest.

__Initial value:__ `{}`  
__Expected return value:__ `Object()`

#### Arguments

| Name        | Description              | Type       | Required | Can be empty |
| ----------- | ------------------------ | ---------- | -------- | ------------ |
| target      | The target that is used. | `String`   | No       | Yes          |
| babelConfig | The target that is used. | `Object()` | No       | Yes          |
