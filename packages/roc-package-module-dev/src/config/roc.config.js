// import build from '../commands/build';
// import dev from '../commands/dev';

const config = {
    settings: {
        build: {
            targets: ['es5', 'es6'],
            input: 'src',
            output: {
                es5: 'lib/es5',
                es6: 'lib/es6'
            }
        }
    }
};

/**
 * Exports the default `roc.config.js`.
 *
 * @return {object} The default `roc.config.js`.
 */
export default config;
