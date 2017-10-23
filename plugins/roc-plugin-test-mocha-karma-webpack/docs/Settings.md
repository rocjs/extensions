# Settings for `roc-plugin-test-mocha-karma-webpack`

## Test


### Web
Settings related to testing for the browser.

| Name    | Description                                                                                                                                                                    | Path                   | CLI option               | Default          | Type              | Required | Can be empty | Extensions                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------ | ---------------- | ----------------- | -------- | ------------ | ----------------------------------- |
| entry   | The entry point that Webpack should be using for the tests, will not be needed to be changed in most situations.                                                               | test.web.entry         | --test-web-entry         |                  | `Filepath`        | No       | No           | roc-plugin-test-mocha-karma-webpack |

#### Src

| Name    | Description                                                                                                                                                                    | Path                   | CLI option               | Default          | Type              | Required | Can be empty | Extensions                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------ | ---------------- | ----------------- | -------- | ------------ | ----------------------------------- |
| path    | The base path to start resolving src files from, should not be the root of the project.                                                                                        | test.web.src.path      | --test-web-src-path      | `"src"`          | `Filepath`        | No       | No           | roc-plugin-test-mocha-karma-webpack |
| pattern | Should be either a glob pattern for which the src files are located or a RegExp. Will be used if no custom entry point is defined. Will be used to get correct code coverage.  | test.web.src.pattern   | --test-web-src-pattern   | `"**/*.js"`      | `RegExp / String` | No       | No           | roc-plugin-test-mocha-karma-webpack |

#### Tests

| Name    | Description                                                                                                                                                                    | Path                   | CLI option               | Default          | Type              | Required | Can be empty | Extensions                          |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------------------------ | ---------------- | ----------------- | -------- | ------------ | ----------------------------------- |
| path    | The base path to start resolving tests from, should not be the root of the project.                                                                                            | test.web.tests.path    | --test-web-tests-path    | `"tests"`        | `Filepath`        | No       | No           | roc-plugin-test-mocha-karma-webpack |
| pattern | Should be either a glob pattern for which the test files are located or a RegExp. Will be used if no custom entry point is defined. Will be used to get correct code coverage. | test.web.tests.pattern | --test-web-tests-pattern | `"**/*.test.js"` | `RegExp / String` | No       | No           | roc-plugin-test-mocha-karma-webpack |
