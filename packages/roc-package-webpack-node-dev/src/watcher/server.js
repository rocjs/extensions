import { setupMaster, fork } from 'cluster';
import path from 'path';

import { getSettings, initLog } from 'roc';
import { parseStats } from 'roc-package-webpack-dev';
import debug from 'debug';
import watch from 'node-watch';

import { invokeHook } from '../roc/util';

const log = initLog();

/**
 * Server watcher.
 *
 * @param {object} compiler - a Webpack compiler instance
 * @returns {Promise} Resolves after it has completed.
 */
export default function server(compiler) {
    const settings = getSettings('dev');
    debug.enable(settings.debug);

    const watcherLogger = debug('roc:dev:node:watcher');
    const builderLogger = debug('roc:dev:node:builder');

    let initiated = false;

    /*
    * We only want to init this function once, however it will be called everytime the builder has created a new build.
    * Because of this reason we have a flag that makes sure the function only runs once, the first time we have a
    * completed build.
    */
    const initServer = (bundlePath) => {
        if (initiated) {
            return;
        }

        initiated = true;

        let serverProcess;
        let startServer;
        let once = false;

        const stopServer = () => {
            invokeHook('dev-process-stopping', serverProcess);
            serverProcess.kill('SIGTERM');
        };

        const restartServer = () => {
            stopServer();
            return startServer();
        };

        const watchForChanges = () => {
            watch([bundlePath].concat(settings.watch), (file) => {
                watcherLogger(`Server restarting due to: ${file}`);
                restartServer();
            });
        };

        const listenForInput = (key = 'rs') => {
            watcherLogger(`You can restart the server by entering "${key}" and pressing enter"`);
            process.stdin.resume();
            process.stdin.setEncoding('utf8');
            process.stdin.on('data', (data) => {
                const parsedData = data.toString().trim().toLowerCase();
                if (parsedData === key) {
                    watcherLogger(`Server restarting due to user input [${key}]`);
                    restartServer();
                }
            });
        };

        /*
        * This function runs everytime the server is restarted, which could be because of user input or a file that has
        * been changed. To make sure we only start with one input listner and one file
        * watcher we have a flag, once.
        */
        startServer = () => {
            const env = {
                ...process.env,
                ROC_INITAL_ARGV: JSON.stringify(process.argv),
                ROC_INITAL_BUILD_MODE: JSON.stringify(getSettings().build.mode),
                ROC_NODE_DEV_ENTRY: bundlePath,
            };
            // Set target executable.
            setupMaster({ exec: require.resolve('./wrapper') });

            // env - use it for the entry file
            serverProcess = fork(env).process;

            // Make sure or node process is terminated when the main process is
            process.on('exit', () => stopServer());

            if (!once) {
                once = true;
                listenForInput();
                watchForChanges();
            }

            // Hook for adding things that integrates with the node process
            invokeHook('dev-process-created', serverProcess);
        };

        startServer();
    };

    return new Promise((resolve, reject) => {
        compiler.watch({
            poll: false,
        }, (serverErr, serverStats) => {
            if (serverErr) {
                return reject(serverErr);
            }

            if (!compiler) {
                return reject(new Error('A compiler instance must be defined in order to start watch!'));
            }

            const statsJson = serverStats.toJson();
            builderLogger(`Server rebuilt ${statsJson.time} ms`);

            if (statsJson.errors.length > 0) {
                statsJson.errors.map(err => log.small.warn(err));
            }

            if (statsJson.warnings.length > 0) {
                statsJson.warnings.map(wrn => log.small.warn(wrn));
            }

            const buildName = getSettings('build').name;
            let bundleName = `${buildName}.js`;

            if (statsJson.assets && statsJson.assets.length > 0) {
                const stats = parseStats(statsJson);
                bundleName = stats.script[buildName][0];
            }

            const artifact = path.join(compiler.outputPath, '/', bundleName);

            // start first time
            initServer(artifact);
            return resolve();
        });
    });
}
