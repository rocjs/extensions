# Settings for `roc-abstract-package-base-dev`

## Build
Build settings.

| Name    | Description                                                                                             | Path          | CLI option      | Default | Type       | Required | Can be empty | Extensions                    |
| ------- | ------------------------------------------------------------------------------------------------------- | ------------- | --------------- | ------- | ---------- | -------- | ------------ | ----------------------------- |
| input   | The entry point for the build.                                                                          | build.input   | --build-input   |         | `Filepath` | Yes      | No           | roc-abstract-package-base-dev |
| output  | The output directory for the build.                                                                     | build.output  | --build-output  |         | `Filepath` | Yes      | No           | roc-abstract-package-base-dev |
| targets | For what targets the code should be built for.                                                          | build.targets | --build-targets |         | `[String]` | Yes      | No           | roc-abstract-package-base-dev |

## Dev
Development settings.

| Name    | Description                                                                                             | Path          | CLI option      | Default | Type       | Required | Can be empty | Extensions                    |
| ------- | ------------------------------------------------------------------------------------------------------- | ------------- | --------------- | ------- | ---------- | -------- | ------------ | ----------------------------- |
| debug   | Filter for debug messages that should be shown during development, see https://npmjs.com/package/debug. | dev.debug     | --dev-debug     |         | `String`   | No       | No           | roc-abstract-package-base-dev |
