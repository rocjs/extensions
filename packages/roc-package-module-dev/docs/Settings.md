# Settings for `roc-package-module-dev`

## Build

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type               | Required |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ------------------ | -------- |
| input   | The directory to build from.                                                                            | build.input      | --build-input      | `"src"`         | `Filepath`         | No       |
| targets | For what targets the code should be built for.                                                          | build.targets    | --build-targets    | `["es5","es6"]` | `[/^es5$|^es6$/i]` | No       |

### Output

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type               | Required |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ------------------ | -------- |
| es5     | The output directory for the ES5 build.                                                                 | build.output.es5 | --build-output-es5 | `"lib/es5"`     | `Filepath`         | No       |
| es6     | The output directory for the ES6 build.                                                                 | build.output.es6 | --build-output-es6 | `"lib/es6"`     | `Filepath`         | No       |

## Dev

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type               | Required |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ------------------ | -------- |
| debug   | Filter for debug messages that should be shown during development, see https://npmjs.com/package/debug. | dev.debug        | --dev-debug        | `"roc:*"`       | `String`           | No       |
