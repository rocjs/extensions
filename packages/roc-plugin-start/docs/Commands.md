# Commands for `roc-plugin-start`

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

## start
__Starts the current project.__

```
roc-plugin-start start [artifact]
```

### Arguments

| Name     | Description                   | Required | Type       | Default |
| -------- | ----------------------------- | -------- | ---------- | ------- |
| artifact | Path to an artifact to start. | No       | `Filepath` |         |

### Settings options
* [runtime](/packages/roc-plugin-start/docs/Settings.md#runtime)
