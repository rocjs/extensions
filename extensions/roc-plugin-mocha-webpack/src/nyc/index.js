import path from 'path';

import { execute, executeSyncExit, getSettings, initLog } from 'roc';
import { parseStats } from 'roc-package-webpack-dev';
import rimraf from 'rimraf';
import webpack from 'webpack';

const log = initLog();

const nyc = require.resolve('nyc/bin/nyc');
const mocha = require.resolve('mocha/bin/mocha');

const getGrep = (grep) => (grep ? ` --grep ${grep}` : '');
const coverageCommand = `${nyc} --reporter=text-summary --include /`;

const mochaCommand = (artifact, grep) => `${mocha} --require ${require.resolve('source-map-support/register')} ` +
    `${getGrep(grep)} ${artifact}`;

const getCommand = (artifact, grep, coverage) => (coverage ?
    `${coverageCommand} ${mochaCommand(artifact, grep)}` :
    mochaCommand(artifact, grep));

const cleanupCoverage = () => rimraf.sync(path.join(process.cwd(), '.nyc_output'));

function getArtifact(compiler, err, stats) {
    const statsJson = stats.toJson();

    if (statsJson.errors.length > 0) {
        statsJson.errors.map((error) => log.small.warn(error));
    }

    if (statsJson.warnings.length > 0) {
        statsJson.warnings.map((warning) => log.small.warn(warning));
    }

    let bundleName = `${getSettings('build').name}.js`;

    if (statsJson.assets && statsJson.assets.length > 0) {
        bundleName = parseStats(statsJson).script[0];
    }

    return path.join(compiler.outputPath, '/', bundleName);
}

function runtTest(command) {
    execute(command)
        .then(cleanupCoverage, cleanupCoverage);
}

export default function nycRunner({ grep, watch, coverage, webpackConfig }) {
    const compiler = webpack(webpackConfig);
    if (watch) {
        compiler.watch({
            poll: true,
        }, (err, stats) => {
            process.env.ROC_TEST_ENTRY = getArtifact(compiler, err, stats);
            runtTest(getCommand(require.resolve('./utils/runtime'), grep, coverage));
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
