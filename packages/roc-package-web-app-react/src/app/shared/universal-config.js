/* globals window */
/* eslint-disable no-var, import/no-mutable-exports */

/**
* Universal Configuration Manager
*
* Manages both __application__ configuration and __Roc__ configuration.
* On the server the configurations will be fetched directly and on the client it's expected that the configuration
* is available on `window` as `ROC_CONFIG` and `APP_CONFIG`.
*
* appConfig will only contain what has been selected by `runtime.configWhitelistProperty`. That means if you want
* to read the full configuration on the server you will need to read it directly from node-config.
*/

/**
* Important to use "var" here over "const" since this might run in PhantomJS
* that does not support them, basically this needs to be ES5.
*/

export var rocConfig = (function getRocConfig() {
    return typeof window !== 'undefined' ? window.ROC_CONFIG : require('roc').getSettings(); // eslint-disable-line
}());

var whiteListed = () => (
    rocConfig.runtime.configWhitelistProperty ?
        require('config')[rocConfig.runtime.configWhitelistProperty] : // eslint-disable-line
        undefined
);

export var appConfig = (function getAppConfig() {
    return typeof window !== 'undefined' ? window.APP_CONFIG : whiteListed();
}());
