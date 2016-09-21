# Settings for `roc-plugin-test-mocha-webpack`

## Runtime

| Name        | Description                                                                                                                                                                    | Path                    | CLI option                | Default          | Type              | Required | Can be empty | Extensions                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------- | ---------------- | ----------------- | -------- | ------------ | ----------------------------- |
| startBundle | Relative path to a bundle to start when calling &quot;start&quot;, is not needed in most cases.                                                                                | runtime.startBundle     | --runtime-startBundle     |                  | `Filepath`        | No       | No           | roc-plugin-start              |

## Test


### Node
Settings related to testing for Node.

| Name        | Description                                                                                                                                                                    | Path                    | CLI option                | Default          | Type              | Required | Can be empty | Extensions                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------- | ---------------- | ----------------- | -------- | ------------ | ----------------------------- |
| entry       | The entry point that Webpack should be using for the tests, will not be needed to be changed in most situations.                                                               | test.node.entry         | --test-node-entry         |                  | `Filepath`        | No       | No           | roc-plugin-test-mocha-webpack |

#### Src

| Name        | Description                                                                                                                                                                    | Path                    | CLI option                | Default          | Type              | Required | Can be empty | Extensions                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------- | ---------------- | ----------------- | -------- | ------------ | ----------------------------- |
| path        | The base path to start resolving src files from, should not be the root of the project.                                                                                        | test.node.src.path      | --test-node-src-path      | `"src"`          | `Filepath`        | No       | No           | roc-plugin-test-mocha-webpack |
| pattern     | Should be either a glob pattern for which the src files are located or a RegExp. Will be used if no custom entry point is defined. Will be used to get correct code coverage.  | test.node.src.pattern   | --test-node-src-pattern   | `"**/*.js"`      | `RegExp / String` | No       | No           | roc-plugin-test-mocha-webpack |

#### Tests

| Name        | Description                                                                                                                                                                    | Path                    | CLI option                | Default          | Type              | Required | Can be empty | Extensions                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------------------------- | ---------------- | ----------------- | -------- | ------------ | ----------------------------- |
| path        | The base path to start resolving tests from, should not be the root of the project.                                                                                            | test.node.tests.path    | --test-node-tests-path    | `"tests"`        | `Filepath`        | No       | No           | roc-plugin-test-mocha-webpack |
| pattern     | Should be either a glob pattern for which the test files are located or a RegExp. Will be used if no custom entry point is defined. Will be used to get correct code coverage. | test.node.tests.pattern | --test-node-tests-pattern | `"**/*.test.js"` | `RegExp / String` | No       | No           | roc-plugin-test-mocha-webpack |
