# Commands for `roc-plugin-test-jest`

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

| Name                           | Description                                                                                                                                                                                                                                                  | Default | Type              | Required | Can be empty |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ----------------- | -------- | ------------ |
| targets                        | The targets the project should be tested for, overrides the settings if provided                                                                                                                                                                             |         |                   | No       |              |

#### Command options

| Name                           | Description                                                                                                                                                                                                                                                  | Default | Type              | Required | Can be empty |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ----------------- | -------- | ------------ |
| --bail                         | Exit the test suite immediately upon the first failing test.                                                                                                                                                                                                 |         | `Boolean`         | No       |              |
| --cache                        | Whether to use the transform cache. Disable the cache using --no-cache.                                                                                                                                                                                      | `true`  | `Boolean`         | No       |              |
| --collectCoverageFrom          | relative to <rootDir> glob pattern matching the files that coverage info needs to be collected from.                                                                                                                                                         |         | `String`          | No       | Yes          |
| --collectCoverageOnlyFrom      | List of paths coverage will be restricted to.                                                                                                                                                                                                                |         | `Array(Filepath)` | No       | Yes          |
| --color                        | Forces test results output color highlighting (even if stdout is not a TTY). Set to false if you would like to have no colors.                                                                                                                               |         | `Boolean`         | No       |              |
| --colors                       | Alias for `--color`.                                                                                                                                                                                                                                         |         | `Boolean`         | No       |              |
| --config                       | The path to a jest config file specifying how to find and execute tests. If no rootDir is set in the config, the current directory is assumed to be the rootDir for the project. This can also be a JSON encoded value which Jest will use as configuration. |         | `String`          | No       | Yes          |
| --coverage                     | Indicates that test coverage information should be collected and reported in the output.                                                                                                                                                                     |         | `Boolean`         | No       |              |
| --coverageDirectory            | The directory where Jest should output its coverage files.                                                                                                                                                                                                   |         | `String`          | No       | Yes          |
| --debug                        | Print debugging info about your jest config.                                                                                                                                                                                                                 |         | `Boolean`         | No       |              |
| --env                          | The test environment used for all tests. This can point to any file or node module. Examples: `jsdom`, `node` or `path/to/my-environment.js`                                                                                                                 |         | `String`          | No       | Yes          |
| -e, --expand                   | Use this flag to show full diffs instead of a patch.                                                                                                                                                                                                         | `false` | `Boolean`         | No       |              |
| --findRelatedTests             | Find related tests for a list of source files that were passed in as arguments. Useful for pre-commit hook integration to run the minimal amount of tests necessary.                                                                                         |         | `Boolean`         | No       |              |
| --forceExit                    | Force Jest to exit after all tests have completed running. This is useful when resources set up by test code cannot be adequately cleaned up.                                                                                                                | `false` | `Boolean`         | No       |              |
| --json                         | Prints the test results in JSON. This mode will send all other test output and user messages to stderr.                                                                                                                                                      |         | `Boolean`         | No       |              |
| --lastCommit                   | Will run all tests affected by file changes in the last commit made.                                                                                                                                                                                         | `false` | `Boolean`         | No       |              |
| --logHeapUsage                 | Logs the heap usage after every test. Useful to debug memory leaks. Use together with `--runInBand` and `--expose-gc` in node.                                                                                                                               |         | `Boolean`         | No       |              |
| --mapCoverage                  | Maps code coverage reports against original source code when transformers supply source maps.                                                                                                                                                                |         | `Boolean`         | No       |              |
| -w, --maxWorkers               | Specifies the maximum number of workers the worker-pool will spawn for running tests. This defaults to the number of the cores available on your machine. (its usually best not to override this default)                                                    |         | `String`          | No       | Yes          |
| --noStackTrace                 | Disables stack trace in test results output                                                                                                                                                                                                                  |         | `Boolean`         | No       |              |
| --notify                       | Activates notifications for test results.                                                                                                                                                                                                                    |         | `Boolean`         | No       |              |
| -o, --onlyChanged              | Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git repository at the moment.                                                                                   |         | `Boolean`         | No       |              |
| --outputFile                   | Write test results to a file when the --json option is also specified.                                                                                                                                                                                       |         | `String`          | No       | Yes          |
| -i, --runInBand                | Run all tests serially in the current process (rather than creating a worker pool of child processes that run tests). This is sometimes useful for debugging, but such use cases are pretty rare.                                                            |         | `Boolean`         | No       |              |
| --setupTestFrameworkScriptFile | The path to a module that runs some code to configure or set up the testing framework before each test.                                                                                                                                                      |         | `String`          | No       | Yes          |
| --silent                       | Prevent tests from printing messages through the console.                                                                                                                                                                                                    | `false` | `Boolean`         | No       |              |
| -t, --testNamePattern          | Run only tests with a name that matches the regex pattern.                                                                                                                                                                                                   |         | `String`          | No       | Yes          |
| --testPathPattern              | A regexp pattern string that is matched against all tests paths before executing the test.                                                                                                                                                                   |         | `String`          | No       | Yes          |
| --testResultsProcessor         | Allows the use of a custom results processor. This processor must be a node module that exports a function expecting as the first argument the result object                                                                                                 |         | `String`          | No       | Yes          |
| --testRunner                   | Allows to specify a custom test runner. The default is  `jasmine2`. A path to a custom test runner can be provided: `<rootDir>/path/to/testRunner.js`.                                                                                                       |         | `String`          | No       | Yes          |
| -u, --updateSnapshot           | Use this flag to re-record snapshots. Can be used together with a test suite pattern or with `--testNamePattern` to re-record snapshot for test matching the pattern                                                                                         | `false` | `Boolean`         | No       |              |
| --useStderr                    | Divert all output to stderr.                                                                                                                                                                                                                                 |         | `Boolean`         | No       |              |
| --verbose                      | Display individual test results with the test suite hierarchy.                                                                                                                                                                                               |         | `Boolean`         | No       |              |
| --version                      | Print the version and exit                                                                                                                                                                                                                                   |         | `Boolean`         | No       |              |
| --watch                        | Watch files for changes and rerun tests related to changed files. If you want to re-run all tests when a file has changed, use the `--watchAll` option.                                                                                                      |         | `Boolean`         | No       |              |
| --watchAll                     | Watch files for changes and rerun all tests. If you want to re-run only the tests related to the changed files, use the `--watch` option.                                                                                                                    |         | `Boolean`         | No       |              |
| --watchman                     | Whether to use watchman for file crawling. Disable using --no-watchman.                                                                                                                                                                                      | `true`  | `Boolean`         | No       |              |

####  Settings options
_All groups are available._

####  Defined by extensions
roc-abstract-plugin-test, roc-plugin-test-jest

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

