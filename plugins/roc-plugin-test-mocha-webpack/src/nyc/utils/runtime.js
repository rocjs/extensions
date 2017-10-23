require('roc/runtime/register');

if (process.env.ROC_TEST_RUNTIME) {
    // eslint-disable-next-line
    require('roc-plugin-start').initRuntime(false, true);
}

// Enable source map support
require('source-map-support/register');

require(process.env.ROC_TEST_ENTRY);
