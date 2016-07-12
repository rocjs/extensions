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
* [start](#start)
* [development](#development)
    * [test](#test)
* [meta](#meta)
    * [docs](#docs)
    * [list-settings](#list-settings)

## start
__Starts the current project.__

```
roc start [artifact]
```

### Arguments
| Name     | Description                   | Default | Type       | Required | Can be empty |
| -------- | ----------------------------- | ------- | ---------- | -------- | ------------ |
| artifact | Path to an artifact to start. |         | `Filepath` | No       | Yes          |

###  Settings options
* [runtime](/Users/gustaf/VG/public/roc-package/roc-plugin-test-mocha-webpack/extensions/roc-plugin-mocha-webpack/docs/Settings.md#runtime)

###  Defined by extensions
roc-plugin-start

## development
```
roc development <command>
```

### test
__Runs tests on the current project.__

```
roc development test [targets]
```

#### Arguments
| Name        | Description                                                                              | Default | Type      | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------------------- | ------- | --------- | -------- | ------------ |
| targets     | The targets the project should be tested for, overrides the settings if provided         |         |           | No       | Yes          |

#### Command options
| Name        | Description                                                                              | Default | Type      | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------------------- | ------- | --------- | -------- | ------------ |
| --coverage  | If coverage reports should be generated for the code.                                    | `true`  | `Boolean` | No       | Yes          |
| -g, --grep  | Will only run tests that match the given pattern. Will be compiled to a RegExp by Mocha. |         | `String`  | No       | Yes          |
| -w, --watch | If the tests should run in watch mode.                                                   | `false` | `Boolean` | No       | Yes          |

####  Settings options
_All groups are available._
* [runtime](/Users/gustaf/VG/public/roc-package/roc-plugin-test-mocha-webpack/extensions/roc-plugin-mocha-webpack/docs/Settings.md#runtime)
* [test](/Users/gustaf/VG/public/roc-package/roc-plugin-test-mocha-webpack/extensions/roc-plugin-mocha-webpack/docs/Settings.md#test)

####  Defined by extensions
roc-abstract-plugin-test, roc-plugin-test-mocha-webpack

## meta
__Meta commands__

```
roc meta <command>
```
Meta commands that can be used to generate meta data about the current project.


### docs
__Generates documentation for the current project.__

```
roc meta docs
```

#### Command options
| Name            | Description | Default        | Type | Required | Can be empty |
| --------------- | ----------- | -------------- | ---- | -------- | ------------ |
| --hide-commands |             |                |      | No       | Yes          |
| --html          |             | `false`        |      | No       | Yes          |
| --markdown      |             | `true`         |      | No       | Yes          |
| --mode          |             | `"github.com"` |      | No       | Yes          |
| --output        |             | `"docs"`       |      | No       | Yes          |

####  Defined by extensions
roc

### list-settings
__Prints all the available settings that can be changed.__

```
roc meta list-settings
```

####  Defined by extensions
roc

