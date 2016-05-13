import path from 'path';
import { execute, executeSync, getSettings } from 'roc';
import { parseStats } from 'roc-package-webpack-dev';
import rimraf from 'rimraf';

let once = false;

const nyc = require.resolve('nyc/bin/nyc');
const mocha = require.resolve('mocha/bin/mocha');

const getGrep = (grep) => grep ? ` --grep ${grep}` : '';
const coverageCommand = `${nyc} --reporter=text-summary --include /`;
const mochaCommand = (artifact, grep) => `${mocha} --require source-map-support/register ${getGrep(grep)} ${artifact}`;
const getCommand = (artifact, grep, coverage) => coverage ?
    `${coverageCommand} ${mochaCommand(artifact, grep)}` :
    mochaCommand(artifact, grep);

const cleanupCoverage = () => rimraf.sync(path.join(process.cwd(), '.nyc_output'));

function getArtifact(compiler, err, stats) {
    const statsJson = stats.toJson();

    if (statsJson.errors.length > 0) {
        statsJson.errors.map((error) => console.warn(error));
    }

    if (statsJson.warnings.length > 0) {
        statsJson.warnings.map((warning) => console.warn(warning));
    }

    let bundleName = `${getSettings('build').name}.js`;

    if (statsJson.assets && statsJson.assets.length > 0) {
        bundleName = parseStats(statsJson).script[0];
    }

    return path.join(compiler.outputPath, '/', bundleName);
}

function startOnce(artifact, grep, coverage) {
    if (!once) {
        once = true;
        const initRuntime = require('roc-plugin-start').initRuntime;
        initRuntime();
    }

    execute(getCommand(artifact, grep, coverage))
        .then(cleanupCoverage, cleanupCoverage);
}

export default function nycRunner({ grep, watch, coverage, rocBuilder }) {
    const compiler = rocBuilder.builder(rocBuilder.buildConfig);
    if (watch) {
        compiler.watch({
            poll: true
        }, (err, stats) => {
            startOnce(getArtifact(compiler, err, stats), grep);
        });
    } else {
        compiler.run((err, stats) => {
            const initRuntime = require('roc-plugin-start').initRuntime;
            initRuntime();

            executeSync(getCommand(getArtifact(compiler, err, stats), grep, coverage));
            if (coverage) {
                executeSync(`${nyc} report --report-dir coverage/nyc/html --reporter=html`);
                executeSync(`${nyc} report --report-dir coverage/nyc/cobertura --reporter=cobertura`);
                cleanupCoverage();
            }
        });
    }
}
