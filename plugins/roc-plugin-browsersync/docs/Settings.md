# Settings for `roc-plugin-browsersync`

## Dev


### Browsersync

| Name    | Description                                                                                                                                                                | Path                         | CLI option                     | Default | Type                                             | Required | Can be empty | Extensions             |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------ | ------- | ------------------------------------------------ | -------- | ------------ | ---------------------- |
| enabled | If Browsersync should be enabled.                                                                                                                                          | dev.browsersync.enabled      | --dev-browsersync-enabled      | `true`  | `Boolean`                                        | Yes      |              | roc-plugin-browsersync |

#### Options

✓ ― Supports __raw

| Name    | Description                                                                                                                                                                | Path                         | CLI option                     | Default | Type                                             | Required | Can be empty | Extensions             |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------ | ------- | ------------------------------------------------ | -------- | ------------ | ---------------------- |
| host    | The host that Browsersync should use, will be automatic by default.                                                                                                        | dev.browsersync.options.host | --dev-browsersync-options-host | `null`  | `String`                                         | No       | No           | roc-plugin-browsersync |
| open    | Decide which URL to open automatically when Browsersync starts. Defaults to &quot;local&quot; if none set. Can be true, local, external, ui, ui-external, tunnel or false. | dev.browsersync.options.open | --dev-browsersync-options-open | `true`  | `/^(external|ui|ui-external|tunnel)$/ / Boolean` | Yes      |              | roc-plugin-browsersync |
| port    | The port that Browsersync should start on, should be a range of at least 2.                                                                                                | dev.browsersync.options.port | --dev-browsersync-options-port | `3030`  | `Integer`                                        | Yes      |              | roc-plugin-browsersync |
