# Commands for `roc-package-module-dev`

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

## build
__Used to build the current project.__

```
roc-package-module-dev build [targets]
```

### Arguments

| Name    | Description                                                                      | Required | Type              | Default |
| ------- | -------------------------------------------------------------------------------- | -------- | ----------------- | ------- |
| targets | The targets the project should be built for, overrides the settings if provided. | No       | `[/^es5$|^es6$/]` |         |

### Settings options
* [build](/packages/roc-package-module-dev/docs/Settings.md#build)

## clean
__Cleans the current project.__

```
roc-package-module-dev clean
```

### Settings options
* [build](/packages/roc-package-module-dev/docs/Settings.md#build)

## dev
__Used to start the current project in development mode.__

```
roc-package-module-dev dev [targets]
```

### Arguments

| Name    | Description                                                                      | Required | Type              | Default |
| ------- | -------------------------------------------------------------------------------- | -------- | ----------------- | ------- |
| targets | The targets the project should be built for, overrides the settings if provided. | No       | `[/^es5$|^es6$/]` |         |

### Settings options
* [build](/packages/roc-package-module-dev/docs/Settings.md#build)

## list-settings
__Prints all the available settings that can be changed.__

```
roc-package-module-dev list-settings
```

## markdown-actions
__Prints all the registered actions in a markdown format.__

```
roc-package-module-dev markdown-actions
```

## markdown-hooks
__Prints all the registered hooks in a markdown format.__

```
roc-package-module-dev markdown-hooks
```

## markdown-settings
__Prints all the available settings that can be changed in a markdown format.__

```
roc-package-module-dev markdown-settings
```
