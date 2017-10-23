# Settings for `roc-package-module-dev`

## Build
Build settings.

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type                    | Required | Can be empty | Extensions                                            |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ----------------------- | -------- | ------------ | ----------------------------------------------------- |
| input   | The directory to build from.                                                                            | build.input      | --build-input      | `"src"`         | `Filepath`              | Yes      | No           | roc-abstract-package-base-dev, roc-package-module-dev |
| targets | For what targets the code should be built for.                                                          | build.targets    | --build-targets    | `["cjs","esm"]` | `Array(/^cjs$|^esm$/i)` | Yes      | No           | roc-abstract-package-base-dev, roc-package-module-dev |

### Output

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type                    | Required | Can be empty | Extensions                                            |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ----------------------- | -------- | ------------ | ----------------------------------------------------- |
| cjs     | The output directory for the CommonJS build.                                                            | build.output.cjs | --build-output-cjs | `"lib/cjs"`     | `Filepath`              | Yes      | No           | roc-package-module-dev                                |
| esm     | The output directory for the ES Modules build.                                                          | build.output.esm | --build-output-esm | `"lib/esm"`     | `Filepath`              | Yes      | No           | roc-package-module-dev                                |

## Dev
Development settings.

| Name    | Description                                                                                             | Path             | CLI option         | Default         | Type                    | Required | Can be empty | Extensions                                            |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------- | ------------------ | --------------- | ----------------------- | -------- | ------------ | ----------------------------------------------------- |
| debug   | Filter for debug messages that should be shown during development, see https://npmjs.com/package/debug. | dev.debug        | --dev-debug        |                 | `String`                | No       | No           | roc-abstract-package-base-dev                         |
