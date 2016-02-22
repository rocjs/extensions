const join = require('path').join;
const exec = require('shelljs').exec;
const name = require('../package.json').name;
const babel = join(__dirname, '..', 'node_modules', '.bin', 'babel');

// Can't use .babelrc since that will be picked up by the example and it breaks the example
const p = [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-es2015-spread'),
    require.resolve('babel-plugin-transform-es2015-function-name'),
    require.resolve('babel-plugin-transform-es2015-sticky-regex'),
    require.resolve('babel-plugin-transform-es2015-unicode-regex'),
    require.resolve('babel-plugin-transform-es2015-parameters'),
    require.resolve('babel-plugin-transform-es2015-destructuring'),
    require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
    require.resolve('babel-plugin-transform-export-extensions'),
    require.resolve('babel-plugin-transform-async-to-generator')
].join(',');

const babelCommandWatch = (packageName) =>
    `${babel} packages/${packageName}/src --out-dir  packages/${packageName}/lib --source-maps --watch --plugins=${p}`;

exec(`${babelCommandWatch(name)} & ${babelCommandWatch(name + '-dev')}`);
