# Settings for `roc-plugin-test-jest`

## Test


### Jest


#### Junit

| Name    | Description                             | Path                    | CLI option                | Default               | Type       | Required | Can be empty | Extensions           |
| ------- | --------------------------------------- | ----------------------- | ------------------------- | --------------------- | ---------- | -------- | ------------ | -------------------- |
| enabled | If a JUnit report should be be created. | test.jest.junit.enabled | --test-jest-junit-enabled | `false`               | `Boolean`  | Yes      |              | roc-plugin-test-jest |
| path    | Where the file should be written.       | test.jest.junit.path    | --test-jest-junit-path    | `"reports/junit.xml"` | `Filepath` | Yes      | No           | roc-plugin-test-jest |
