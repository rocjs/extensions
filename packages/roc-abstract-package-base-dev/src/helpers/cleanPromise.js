import rimraf from 'rimraf';
import { getAbsolutePath } from 'roc';

/**
 * Cleans a directory.
 *
 * @param {string} path - A directory that should be cleaned.
 *
 * @returns {Promise} - A promise that either resolves when done or rejects if there is an error.
 */
export default function cleanPromise(path, directory) {
    return new Promise((resolve, reject) => {
        rimraf(getAbsolutePath(path, directory), (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
}
