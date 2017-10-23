# Settings for `roc-plugin-assets-images`

## Build


### Assets


#### Images
Settings for image asset related things.


##### FileLoader
Settings for https://github.com/webpack/file-loader

| Name      | Description                                                  | Path                                        | CLI option                                    | Default          | Type       | Required | Can be empty | Extensions               |
| --------- | ------------------------------------------------------------ | ------------------------------------------- | --------------------------------------------- | ---------------- | ---------- | -------- | ------------ | ------------------------ |
| filetypes | The filetypes that should be used together with file-loader. | build.assets.images.fileLoader.filetypes    | --build-assets-images-fileLoader-filetypes    | `["jpg"]`        | `[String]` | Yes      | No           | roc-plugin-assets-images |

###### Options
Options that will be used as query parameters.

✓ ― Supports __raw

| Name      | Description                                                  | Path                                        | CLI option                                    | Default          | Type       | Required | Can be empty | Extensions               |
| --------- | ------------------------------------------------------------ | ------------------------------------------- | --------------------------------------------- | ---------------- | ---------- | -------- | ------------ | ------------------------ |
| name      | The name for the generated files.                            | build.assets.images.fileLoader.options.name | --build-assets-images-fileLoader-options-name | `"[hash].[ext]"` | `String`   | Yes      | No           | roc-plugin-assets-images |

##### UrlLoader
Settings for https://github.com/webpack/url-loader

| Name      | Description                                                  | Path                                        | CLI option                                    | Default          | Type       | Required | Can be empty | Extensions               |
| --------- | ------------------------------------------------------------ | ------------------------------------------- | --------------------------------------------- | ---------------- | ---------- | -------- | ------------ | ------------------------ |
| filetypes | The filetypes that should be used together with url-loader.  | build.assets.images.urlLoader.filetypes     | --build-assets-images-urlLoader-filetypes     | `["png","svg"]`  | `[String]` | Yes      | No           | roc-plugin-assets-images |

###### Options
Options that will be used as query parameters.

✓ ― Supports __raw

| Name      | Description                                                  | Path                                        | CLI option                                    | Default          | Type       | Required | Can be empty | Extensions               |
| --------- | ------------------------------------------------------------ | ------------------------------------------- | --------------------------------------------- | ---------------- | ---------- | -------- | ------------ | ------------------------ |
| limit     | The maximum size (in bytes) for base64 encoding an image.    | build.assets.images.urlLoader.options.limit | --build-assets-images-urlLoader-options-limit | `10000`          | `Integer`  | Yes      |              | roc-plugin-assets-images |
