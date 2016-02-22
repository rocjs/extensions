const exec = require('shelljs').exec;
const name = require('../package.json').name;

exec(`cd packages/${name} && npm run lint & cd packages/${name}-dev && npm run lint & wait`);
