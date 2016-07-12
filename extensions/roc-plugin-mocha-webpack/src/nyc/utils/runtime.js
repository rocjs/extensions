require('roc/runtime/register');

require('roc-plugin-start').initRuntime(false, true);

require(process.env.ROC_TEST_ENTRY);
