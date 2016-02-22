// Based on release script by Michael Jackson - @mjackson
const resolvePath = require('path').resolve;
const readFileSync = require('fs').readFileSync;
const shellExec = require('shelljs').exec;
const prompt = require('readline-sync').question;
const name = require('../package.json').name;

// exec wrapper that handles exit codes
const exec = (command) => {
    if (shellExec(command).code !== 0) {
        console.log('The command failed with a non 0 exit code.');
        process.exit(1);
    }
};

// Will base the version number on the main package
const getVersion = () =>
    JSON.parse(readFileSync(resolvePath(__dirname, `../packages/${name}`, 'package.json'))).version;

if (process.cwd() !== resolvePath(__dirname, '..')) {
    console.error('The release script must be run from the repo root.');
    process.exit(1);
}

// Get the next version, which may be specified as a semver version number or anything `npm version` recognizes. This
// is a "pre-release" if nextVersion is premajor, preminor, prepatch, or prerelease
const nextVersion = prompt(`Next version (current version is ${getVersion()})? `);
const isPrerelease = nextVersion.substring(0, 3) === 'pre';

// 1) Make sure the build passes
exec('npm run build');

// 2) Make sure the tests pass
exec('npm test');

// 3) Increment the package version in package.json for both projects
exec(`cd packages/${name} && npm version ${nextVersion} --no-git-tag-version`);
exec(`cd packages/${name}-dev && npm version ${nextVersion} --no-git-tag-version`);

// 4) Read the version from main package
const newVersion = require(`../packages/${name}/package.json`).version;

// 5) Create a new commit
// 6) Create a v* tag that points to that commit
exec(`git add . && git commit -m "Version ${newVersion}" && git tag v${newVersion}`);

// 7) Push to GitHub master. Do this before we publish in case anyone has pushed to GitHub since we last pulled
exec('git push origin master');

// 8) Publish to npm. Use the "next" tag for pre-releases, "latest" for all others
exec(`cd packages/${name} && npm publish --tag ${isPrerelease ? 'next' : 'latest'}`);
exec(`cd packages/${name}-dev && npm publish --tag ${isPrerelease ? 'next' : 'latest'}`);

// 9) Push the v* tag to GitHub
exec(`git push -f origin v${newVersion}`);

// 10) Push the "latest" tag to GitHub
if (!isPrerelease) {
    exec('git tag -f latest');
    exec('git push -f origin latest');
}
