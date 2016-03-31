# Commands for `roc-package-webpack-node`

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
* [list-settings](#list-settings)
* [markdown-actions](#markdown-actions)
* [markdown-hooks](#markdown-hooks)
* [markdown-settings](#markdown-settings)
* [start](#start)

## list-settings
__Prints all the available settings that can be changed.__

```
roc-package-webpack-node list-settings
```

## markdown-actions
__Prints all the registered actions in a markdown format.__

```
roc-package-webpack-node markdown-actions
```

## markdown-hooks
__Prints all the registered hooks in a markdown format.__

```
roc-package-webpack-node markdown-hooks
```

## markdown-settings
__Prints all the available settings that can be changed in a markdown format.__

```
roc-package-webpack-node markdown-settings
```

## start
__Starts the current project.__

```
roc-package-webpack-node start [artifact]
```

### Arguments

| Name     | Description                   | Required | Type       | Default |
| -------- | ----------------------------- | -------- | ---------- | ------- |
| artifact | Path to an artifact to start. | No       | `Filepath` |         |

### Settings options
* [runtime](/packages/roc-package-webpack-node/docs/Settings.md#runtime)
