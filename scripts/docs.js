const exec = require('shelljs').exec;
const name = require('../package.json').name;

const toHide = Object.keys(require('roc').roc.config.commands).join(',');

const settingsDocs =
    'node bin/index.js markdown-settings > ./docs/Settings.md';
const commandsDocs =
    `node bin/index.js markdown-commands --hide-commands ${toHide} /dev/docs/Settings.md > ./docs/Commands.md`;
const hooksDocs =
    'node bin/index.js markdown-hooks > ./docs/Hooks.md';
const actionsDocs =
    'node bin/index.js markdown-actions > ./docs/Actions.md';

const generateDocumentation = (packageName) =>
    `cd packages/${packageName} && ${settingsDocs} && ${commandsDocs} && ${hooksDocs} && ${actionsDocs}`;

exec(`${generateDocumentation(name)} & ${generateDocumentation(name + '-dev')} & wait`);
