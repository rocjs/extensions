# roc-package-module
Package providing module support.  

# Usage
To use this to build your modules you will need the [dev package](https://github.com/rocjs/roc-package-module/blog/master/dev/README.md). _Currently this package does nothing for your module directly._  
For complete commands see development docs [commands](https://github.com/rocjs/roc-package-module/blog/master/dev/docs/Commands.md) and [settings](https://github.com/rocjs/roc-package-module/blog/master/dev/docs/Settings.md)

## Exposes
In general; for a package to be considered valid it must export `rocPackageConfig` and `rocPackageMetaConfig`. It may or may not provide additional exports.

Please read the esdocs for details here (link pending).

### Runtime
Config: `rocPackageConfig`, `rocPackageMetaConfig`  
Commands: No commands added  
For complete commands see development docs [commands](https://github.com/rocjs/roc-package-module/blog/master/dev/docs/Commands.md) and [settings](https://github.com/rocjs/roc-package-module/blog/master/dev/docs/Settings.md)

### Development
Used with [roc-package-module-dev](https://github.com/rocjs/roc-package-module/blog/master/dev/README.md)
