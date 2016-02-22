# roc-package-module-dev
Package providing module development support.  

# Usage
For complete commands see [commands.md](https://github.com/rocjs/roc-package-module/blog/master/dev/docs/Commands.md)

## Exposes
In general; for a package to be considered valid it must export `rocPackageConfig` and `rocPackageMetaConfig`. It may or may not provide additional exports.

Please read the esdocs for details here (link pending).

### Development
Config: `rocPackageConfig`, `rocPackageMetaConfig`  
Commands: `build`  

`build` transpiles your source code to the provided target; `es5` or `es6`.

### Runtime
Used with [roc-package-module](https://github.com/rocjs/roc-package-module/blog/master/README.md)
