import path from 'path';

import { execute, executeSyncExit, getSettings, initLog } from 'roc';
import { parseStats } from 'roc-package-webpack-dev';
import rimraf from 'rimraf';
import webpack from 'webpack';

import runMocha from './mocha';

const log = initLog();

const nyc = require.resolve('nyc/bin/nyc');
const mocha = require.resolve('mocha/bin/mocha');

const getGrep = (grep) => (grep ? ` --grep ${grep}` : '');
const coverageCommand = `${nyc} --reporter=text-summary --include /`;

const mochaCommand = (artifact, grep) => `${mocha} ` +
    `${getGrep(grep)} ${artifact}`;

const getCommand = (artifact, grep, coverage) => (coverage ?
    `${coverageCommand} ${mochaCommand(artifact, grep)}` :
    mochaCommand(artifact, grep));

const cleanupCoverage = () => rimraf.sync(path.join(process.cwd(), '.nyc_output'));

function getArtifact(compiler, err, stats) {
    if (err) {
        throw err;
    }

    const statsJson = stats.toJson();

    if (statsJson.errors.length > 0 || statsJson.warnings.length > 0) {
        if (statsJson.errors.length > 0) {
            statsJson.errors.map((error) => log.small.warn(error));
        }

        if (statsJson.warnings.length > 0) {
            statsJson.warnings.map((warning) => log.small.warn(warning));
        }

        return undefined;
    }

    let bundleName = `${getSettings('build').name}.js`;

    if (statsJson.assets && statsJson.assets.length > 0) {
        bundleName = parseStats(statsJson).script[0];
    }

    return path.join(compiler.outputPath, '/', bundleName);
}

let runningTest = false;
let nextCommand;

function runTest(command) {
    function cleanupCoverageWrapper() {
        cleanupCoverage();
        if (nextCommand) {
            runTest(nextCommand);
        } else {
            runningTest = false;
        }
    }

    nextCommand = null;
    runningTest = true;
    execute(command)
       .then(cleanupCoverageWrapper, cleanupCoverageWrapper);
}

function watchTest(command) {
    if (runningTest) {
        nextCommand = command;
    } else {
        runTest(command);
    }
}

export default function nycRunner({ grep, watch, coverage, runtime, webpackConfig }) {
    const compiler = webpack(webpackConfig);

    if (watch) {
        let mochaRunner;

        if (coverage) {
            log.small.info('You have enabled coverage for the watch mode for roc-plugin-test-mocha-webpack. ' +
                'This will make the tests run slower, the recommendation is to not use coverage in watch mode.');

            process.env.ROC_TEST_RUNTIME = runtime;
        } else {
            if (runtime) {
                // eslint-disable-next-line
                require('roc-plugin-start').initRuntime(false, true);
            }

            mochaRunner = runMocha(grep);
        }

        compiler.watch({
            poll: true,
        }, (err, stats) => {
            const artifact = getArtifact(compiler, err, stats);
            if (artifact) {
                if (coverage) {
                    process.env.ROC_TEST_ENTRY = artifact;
                    watchTest(getCommand(require.resolve('./utils/runtime'), grep, coverage));
                } else {
                    mochaRunner.run(artifact);
                }
            } else if (mochaRunner) {
                mochaRunner.abort();
            }
        });
    } else {
        compiler.run((err, stats) => {
            process.env.ROC_TEST_ENTRY = getArtifact(compiler, err, stats);
            executeSyncExit(getCommand(require.resolve('./utils/runtime'), grep, coverage));

            if (coverage) {
                executeSyncExit(`${nyc} report --report-dir coverage/nyc/html --reporter=html`);
                executeSyncExit(`${nyc} report --report-dir coverage/nyc/cobertura --reporter=cobertura`);
                cleanupCoverage();
            }
        });
    }
}
