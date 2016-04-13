# Commands for `roc-abstract-plugin-test`

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
* [test](#test)

## test
__Runs tests on the current project.__

```
roc-abstract-plugin-test test [targets]
```

### Arguments

| Name    | Description                                                                      | Required | Type            | Default |
| ------- | -------------------------------------------------------------------------------- | -------- | --------------- | ------- |
| targets | The targets the project should be tested for, overrides the settings if provided | No       | `Context based` |         |

### Settings options
* [build](/packages/roc-abstract-plugin-test/docs/Settings.md#build)
* [test](/packages/roc-abstract-plugin-test/docs/Settings.md#test)
