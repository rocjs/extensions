import {
    isPath,
    isArray,
    isArrayOrSingle
} from 'roc/validators';

const meta = {
    settings: {
        descriptions: {
            dev: {
                watch: 'Files/folders that should trigger a restart of the server.'
            }
        },

        validations: {
            dev: {
                watch: isArrayOrSingle(isPath)
            },

            build: {
                targets: isArray(/^node$/i)
            }
        }
    }
};

/**
 * Exports the `roc.config.meta.js`.
 *
 * @return {object} The `roc.config.meta.js`.
 */
export default meta;
