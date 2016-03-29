# Settings for `roc-plugin-browsersync`

## Dev

### Browsersync
Settings for Browsersync.

| Name    | Description                                                                | Path                    | CLI option                | Default | Type      | Required |
| ------- | -------------------------------------------------------------------------- | ----------------------- | ------------------------- | ------- | --------- | -------- |
| enabled | If Browsersync should be enabled.                                          | dev.browsersync.enabled | --dev-browsersync-enabled | `true`  | `Boolean` | No       |
| open    | If Browsersync should open when the server is ready.                       | dev.browsersync.open    | --dev-browsersync-open    | `true`  | `Boolean` | No       |
| port    | The port that Browsersync should start on, should be a range of at least 2 | dev.browsersync.port    | --dev-browsersync-port    | `3030`  | `Integer` | No       |
