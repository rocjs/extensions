const join = require('path').join;
const exec = require('shelljs').exec;
const name = require('../package.json').name;
const esdoc = join(__dirname, '..', 'node_modules', '.bin', 'esdoc');

const esdocConfig = require.resolve('../esdoc.js');

const esdocs = (packageName) => `cd packages/${packageName} && ${esdoc} -c ${esdocConfig}`;

exec(`${esdocs(name)} & ${esdocs(name + '-dev')} & wait`);
