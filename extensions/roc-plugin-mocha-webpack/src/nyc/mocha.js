import Mocha from 'mocha';
import log from 'roc/log/default/small';

let runner;
let restart;
let grepRegExp;

function mochaRunner(file) {
    if (runner) {
        log.note('\nAborting current tests and will restart.\n');
        restart = file;
        runner.abort();
    } else {
        restart = null;
        const mocha = new Mocha();

        if (grepRegExp) {
            mocha.grep(grepRegExp);
        }

        delete require.cache[file];

        mocha.addFile(file);

        runner = mocha.run(() => {
            runner = null;

            if (restart) {
                mochaRunner(restart);
            }
        });
    }
}

export default function runMocha(grep) {
    // Enable source map support
    // eslint-disable-next-line
    require('source-map-support/register');

    if (grep) {
        grepRegExp = new RegExp(grep);
    }

    return {
        abort: () => {
            if (runner) {
                log.warn('\nAborting current tests.\n');
                runner.abort();
            }
        },
        run: mochaRunner,
    };
}
