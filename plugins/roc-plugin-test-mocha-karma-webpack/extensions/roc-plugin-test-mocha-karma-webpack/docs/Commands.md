# Commands for `roc-plugin-test-mocha-karma-webpack`

## General Information
All commands can be called with some additional options illustrated in the table below.

### General options

| Name                  | Description                                    | Required |
| --------------------- | ---------------------------------------------- | -------- |
| -b, --better-feedback | Enables source-map-support and loud-rejection. | No       |
| -c, --config          | Path to configuration file.                    | No       |
| -d, --directory       | Path to working directory.                     | No       |
| -h, --help            | Output usage information.                      | No       |
| -V, --verbose         | Enable verbose mode.                           | No       |
| -v, --version         | Output version number.                         | No       |

## Commands
* [development](#development)
    * [test](#test)
* [meta](#meta)
    * [docs](#docs)
    * [list-settings](#list-settings)

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

| Name        | Description                                                                      | Default | Type      | Required | Can be empty |
| ----------- | -------------------------------------------------------------------------------- | ------- | --------- | -------- | ------------ |
| targets     | The targets the project should be tested for, overrides the settings if provided |         |           | No       |              |

#### Command options

| Name        | Description                                                                      | Default | Type      | Required | Can be empty |
| ----------- | -------------------------------------------------------------------------------- | ------- | --------- | -------- | ------------ |
| --coverage  | If coverage reports should be generated for the code.                            | `true`  | `Boolean` | No       |              |
| -g, --grep  | Will only run tests that match the given pattern. Will be compiled to a RegExp.  |         | `String`  | No       | Yes          |
| -w, --watch | If the tests should run in watch mode.                                           | `false` | `Boolean` | No       |              |

####  Settings options
_All groups are available._
* [test](docs/Settings.md#test)

####  Defined by extensions
roc-abstract-plugin-test, roc-plugin-test-mocha-karma-webpack

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

| Name       | Description                                                   | Default        | Type                                                              | Required | Can be empty |
| ---------- | ------------------------------------------------------------- | -------------- | ----------------------------------------------------------------- | -------- | ------------ |
| --html     | If HTML should be generated. (Not supported yet)              | `false`        | `Boolean`                                                         | No       |              |
| --markdown | If markdown should be generated.                              | `true`         | `Boolean`                                                         | No       |              |
| --mode     | The platform that is to be used, for link generation.         | `"github.com"` | `/github\.com|nodejs\.org|bitbucket\.org|ghost\.org|gitlab\.com/` | No       |              |
| --output   | A directory to place the generated documentation inside of.   | `"docs"`       | `String`                                                          | No       | No           |
| --project  | If the projects configuration and actions should be included. | `false`        | `Boolean`                                                         | No       |              |

####  Defined by extensions
roc

### list-settings
__Prints all the available settings that can be changed.__

```
roc meta list-settings
```

####  Defined by extensions
roc

