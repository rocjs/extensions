# Settings for `roc-plugin-test-mocha-webpack`

## Build

| Name               | Description                                                                                                                                      | Path                     | CLI option                 | Default          | Type                    | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------- | ---------------- | ----------------------- | -------- |
| disableProgressbar | Should the progress bar be disabled for builds.                                                                                                  | build.disableProgressbar | --build-disableProgressbar | `false`          | `Boolean`               | No       |
| input              | The entry point for the build.                                                                                                                   | build.input              | --build-input              | `"src/index.js"` | `Filepath / [Filepath]` | No       |
| mode               | What mode the application should be built for. Possible values are &quot;dev&quot; and &quot;dist&quot;.                                         | build.mode               | --build-mode               | `"dist"`         | `/^dev|dist|test$/i`    | No       |
| name               | The name of the generated application bundle.                                                                                                    | build.name               | --build-name               | `"app"`          | `String / [String]`     | No       |
| output             | The output directory for the build.                                                                                                              | build.output             | --build-output             | `"build"`        | `Filepath / [Filepath]` | No       |
| path               | The basepath for the application.                                                                                                                | build.path               | --build-path               | `"/"`            | `Filepath`              | No       |
| targets            | For what targets the code should be built for.                                                                                                   | build.targets            | --build-targets            | `null`           | `[]`                    | No       |

## Dev

| Name               | Description                                                                                                                                      | Path                     | CLI option                 | Default          | Type                    | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------- | ---------------- | ----------------------- | -------- |
| debug              | Filter for debug messages that should be shown during development, see https://npmjs.com/package/debug.                                          | dev.debug                | --dev-debug                | `"roc:*"`        | `String`                | No       |
| host               | The host to use during development, will be automatically defined if left empty.                                                                 | dev.host                 | --dev-host                 | `null`           | `String`                | No       |
| port               | Port for the dev server.                                                                                                                         | dev.port                 | --dev-port                 | `3001`           | `Integer`               | No       |

## Test

### Node
Settings related to testing for Node.

| Name               | Description                                                                                                                                      | Path                     | CLI option                 | Default          | Type                    | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------- | ---------------- | ----------------------- | -------- |
| entry              | The entry point that Webpack should be using for the tests, will not be needed to be changed in most situations.                                 | test.node.entry          | --test-node-entry          | `null`           | `Filepath`              | No       |

#### Src

| Name               | Description                                                                                                                                      | Path                     | CLI option                 | Default          | Type                    | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------- | ---------------- | ----------------------- | -------- |
| path               | The base path to start resolving src files from, should not be the root of the project.                                                          | test.node.src.path       | --test-node-src-path       | `"src"`          | `Filepath`              | No       |
| pattern            | A glob pattern for which the src files are located, will be used if no custom entry point is defined. Will be used to get correct code coverage. | test.node.src.pattern    | --test-node-src-pattern    | `"**/*.js"`      | `RegExp / String`       | No       |

#### Tests

| Name               | Description                                                                                                                                      | Path                     | CLI option                 | Default          | Type                    | Required |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | -------------------------- | ---------------- | ----------------------- | -------- |
| path               | The base path to start resolving tests from, should not be the root of the project.                                                              | test.node.tests.path     | --test-node-tests-path     | `"tests"`        | `Filepath`              | No       |
| pattern            | A glob pattern for which the src files are located, will be used if no custom entry point is defined. Will be used to get correct code coverage. | test.node.tests.pattern  | --test-node-tests-pattern  | `"**/*.test.js"` | `RegExp / String`       | No       |
