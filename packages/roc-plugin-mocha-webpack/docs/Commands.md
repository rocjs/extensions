# Commands for `roc-plugin-test-mocha-webpack`

## General Information
All commands can be called with some additional options as can be seen below.

### General options

| Name            | Description                                                                                                   | Required |
| --------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| -c, --config    | Path to configuration file, will default to roc.config.js in current working directory.                       | No       |
| -d, --directory | Path to working directory, will default to the current working directory. Can be either absolute or relative. | No       |
| -h, --help      | Output usage information.                                                                                     | No       |
| -V, --verbose   | Enable verbose mode.                                                                                          | No       |
| -v, --version   | Output version number.                                                                                        | No       |

## Commands
* [build](#build)
* [clean](#clean)
* [dev](#dev)
* [list-settings](#list-settings)
* [markdown-actions](#markdown-actions)
* [markdown-hooks](#markdown-hooks)
* [markdown-settings](#markdown-settings)
* [test](#test)

## build
__Build the current project.__

```
roc-plugin-test-mocha-webpack build
```

### Settings options
* [build](/packages/roc-plugin-mocha-webpack/docs/Settings.md#build)

## clean
__Cleans the current project.__

```
roc-plugin-test-mocha-webpack clean
```

### Settings options
* [build](/packages/roc-plugin-mocha-webpack/docs/Settings.md#build)

## dev
__Starts the current project in development mode.__

```
roc-plugin-test-mocha-webpack dev
```

### Settings options
_All groups are available._
* [build](/packages/roc-plugin-mocha-webpack/docs/Settings.md#build)
* [dev](/packages/roc-plugin-mocha-webpack/docs/Settings.md#dev)
* [test](/packages/roc-plugin-mocha-webpack/docs/Settings.md#test)

## list-settings
__Prints all the available settings that can be changed.__

```
roc-plugin-test-mocha-webpack list-settings
```

## markdown-actions
__Prints all the registered actions in a markdown format.__

```
roc-plugin-test-mocha-webpack markdown-actions
```

## markdown-hooks
__Prints all the registered hooks in a markdown format.__

```
roc-plugin-test-mocha-webpack markdown-hooks
```

## markdown-settings
__Prints all the available settings that can be changed in a markdown format.__

```
roc-plugin-test-mocha-webpack markdown-settings
```

## test
__Runs tests on the current project.__

```
roc-plugin-test-mocha-webpack test [targets]
```

### Arguments

| Name        | Description                                                                              | Required | Type      | Default |
| ----------- | ---------------------------------------------------------------------------------------- | -------- | --------- | ------- |
| targets     | The targets the project should be tested for, overrides the settings if provided         | No       | `[]`      |         |

### Command options

| Name        | Description                                                                              | Required | Type      | Default |
| ----------- | ---------------------------------------------------------------------------------------- | -------- | --------- | ------- |
| --coverage  | If coverage reports should be generated for the code.                                    | No       | `Boolean` | `true`  |
| -g, --grep  | Will only run tests that match the given pattern. Will be compiled to a RegExp by Mocha. | No       | `String`  |         |
| -w, --watch | If the tests should run in watch mode.                                                   | No       | `Boolean` | `false` |

### Settings options
* [build](/packages/roc-plugin-mocha-webpack/docs/Settings.md#build)
* [test](/packages/roc-plugin-mocha-webpack/docs/Settings.md#test)
