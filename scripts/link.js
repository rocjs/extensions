const exec = require('shelljs').exec;
const name = require('../package.json').name;

exec(`cd packages/${name} && npm link && cd ../../packages/${name}-dev && npm link ${name} && npm link`);
