# Roc Extensions [![Build Status](https://travis-ci.org/rocjs/extensions.svg?branch=master)](https://travis-ci.org/rocjs/extensions)

The core extensions in [Roc](https://github.com/rocjs/roc) are managed as a monorepo, this to make it easier to work with them and contribute.

## Extensions

### Packages

- [roc-abstract-package-base](/packages/roc-abstract-package-base)
- [roc-abstract-package-base-dev](/packages/roc-abstract-package-base-dev)
- [roc-package-module](/packages/roc-package-module)
- [roc-package-module-dev](/packages/roc-package-module-dev)
- [roc-package-web-app](/packages/roc-package-web-app)
- [roc-package-web-app-dev](/packages/roc-package-web-app-dev)
- [roc-package-web-app-react](/packages/roc-package-web-app-react)
- [roc-package-web-app-react-dev](/packages/roc-package-web-app-react-dev)
- [roc-package-web-component](/packages/roc-package-component)
- [roc-package-component-dev](/packages/roc-package-component-dev)
- [roc-package-webpack](/packages/roc-package-webpack)
- [roc-package-webpack-dev](/packages/roc-package-webpack-dev)
- [roc-package-webpack-node](/packages/roc-package-webpack-node)
- [roc-package-webpack-node-dev](/packages/roc-package-webpack-node-dev)
- [roc-package-webpack-web](/packages/roc-package-webpack-web)
- [roc-package-webpack-web-dev](/packages/roc-package-webpack-web-dev)

### Plugins

- [roc-abstract-plugin-test](/plugins/roc-abstract-plugin-test)
- [roc-plugin-assets-images](/plugins/roc-plugin-assets-images)
- [roc-plugin-babel](/plugins/roc-plugin-babel)
- [roc-plugin-browsersync](/plugins/roc-plugin-browsersync)
- [roc-plugin-react](/plugins/roc-plugin-react)
- [roc-plugin-react-dev](/plugins/roc-plugin-react-dev)
- [roc-plugin-start](/plugins/roc-plugin-start)
- [roc-plugin-style-css](/plugins/roc-plugin-style-css)
- [roc-plugin-style-less](/plugins/roc-plugin-style-less)
- [roc-plugin-style-sass](/plugins/roc-plugin-style-sass)
- [roc-plugin-test-jest](/plugins/roc-plugin-test-jest)
- [roc-plugin-test-mocha-karma-webpack](/plugins/roc-plugin-test-mocha-karma-webpack)
- [roc-plugin-test-mocha-webpack](/plugins/roc-plugin-test-mocha-webpack)

## Documentation

[General documentation about how extensions work can be found here.](https://github.com/rocjs/roc/tree/master/docs)

## Contribute

### Commit messages

This repository uses automated releases through the [Angular commit message convention](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/convention.md) but with the addition that the subject _SHOULD_ be capitalized.

### Setup repository

```
$ npm start bootstrap
```
Will install dependencies and link projects together.

```
$ npm start build -- --watch
```
Will build the projects in watch mode.

```
$ npm test
```
Will test the projects.

## Using `roc-package-web-app-react`?

Read the comprehensive user-guide on how to best utilize the tools and libraries provided by this Roc extension [here](/packages/roc-package-web-app-react/GUIDE.md).