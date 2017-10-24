/* global __PATH_TESTS__ __PATTERN_TESTS__ __PATH_SRC__ __PATTERN_SRC__ */

/*
* We need to use var here since rid will not transform that since we target Node 4+.
* However this code will in the end run inside a browser that might not support const, like PhantomJS
*/

/* eslint-disable */

var testContext = require.context(__PATH_TESTS__, true, __PATTERN_TESTS__);
testContext.keys().forEach(testContext);

// coverage
var srcContext = require.context(__PATH_SRC__, true, __PATTERN_SRC__);
srcContext.keys().forEach(srcContext);
