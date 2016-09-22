# Settings for `roc-plugin-browsersync`

## Dev


### Browsersync

| Name    | Description                                                                 | Path                         | CLI option                     | Default | Type      | Required | Can be empty | Extensions             |
| ------- | --------------------------------------------------------------------------- | ---------------------------- | ------------------------------ | ------- | --------- | -------- | ------------ | ---------------------- |
| enabled | If Browsersync should be enabled.                                           | dev.browsersync.enabled      | --dev-browsersync-enabled      | `true`  | `Boolean` | Yes      |              | roc-plugin-browsersync |

#### Options

✓ ― Supports __raw

| Name    | Description                                                                 | Path                         | CLI option                     | Default | Type      | Required | Can be empty | Extensions             |
| ------- | --------------------------------------------------------------------------- | ---------------------------- | ------------------------------ | ------- | --------- | -------- | ------------ | ---------------------- |
| open    | If Browsersync should open when the server is ready.                        | dev.browsersync.options.open | --dev-browsersync-options-open | `true`  | `Boolean` | Yes      |              | roc-plugin-browsersync |
| port    | The port that Browsersync should start on, should be a range of at least 2. | dev.browsersync.options.port | --dev-browsersync-options-port | `3030`  | `Integer` | Yes      |              | roc-plugin-browsersync |
