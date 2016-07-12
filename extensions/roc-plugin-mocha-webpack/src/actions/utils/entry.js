/* global __PATH_TESTS__ __PATTERN_TESTS__ __PATH_SRC__ __PATTERN_SRC__ */

const testContext = require.context(__PATH_TESTS__, true, __PATTERN_TESTS__);
testContext.keys().forEach(testContext);

// coverage
const srcContext = require.context(__PATH_SRC__, true, __PATTERN_SRC__);
srcContext.keys().forEach(srcContext);
