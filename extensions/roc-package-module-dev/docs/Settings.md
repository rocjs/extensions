# Settings for `roc-package-module-dev`

## Build
Build settings.

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type               | Required | Can be empty | Extensions                                            |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ------------------ | -------- | ------------ | ----------------------------------------------------- |
| input   | The directory to build from.                                                                            | build.input      | --build-input      | `"src"`         | `Filepath`         | Yes      | No           | roc-abstract-package-base-dev, roc-package-module-dev |
| targets | For what targets the code should be built for.                                                          | build.targets    | --build-targets    | `["es5","es6"]` | `[/^es5$|^es6$/i]` | Yes      | No           | roc-abstract-package-base-dev, roc-package-module-dev |

### Output

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type               | Required | Can be empty | Extensions                                            |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ------------------ | -------- | ------------ | ----------------------------------------------------- |
| es5     | The output directory for the ES5 build.                                                                 | build.output.es5 | --build-output-es5 | `"lib/es5"`     | `Filepath`         | Yes      | No           | roc-package-module-dev                                |
| es6     | The output directory for the ES6 build.                                                                 | build.output.es6 | --build-output-es6 | `"lib/es6"`     | `Filepath`         | Yes      | No           | roc-package-module-dev                                |

## Dev
Development settings.

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type               | Required | Can be empty | Extensions                                            |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ------------------ | -------- | ------------ | ----------------------------------------------------- |
| debug   | Filter for debug messages that should be shown during development, see https://npmjs.com/package/debug. | dev.debug        | --dev-debug        |                 | `String`           | No       | No           | roc-abstract-package-base-dev                         |
