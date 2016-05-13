const path = require('path');

// Makes it possible for use to generate documentation for this package.
module.exports = {
    plugins: [path.join(__dirname, 'lib', 'index.js')]
};
