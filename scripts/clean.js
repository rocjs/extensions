const join = require('path').join;
const exec = require('shelljs').exec;
const name = require('../package.json').name;
const rimraf = join(__dirname, '..', 'node_modules', '.bin', 'rimraf');

const clean = (packageName) => `${rimraf} packages/${packageName}/lib packages/${packageName}/esdocs`

exec(`${clean(name)} & ${clean(name + '-dev')} & wait`);
