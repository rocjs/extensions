import log from 'roc/log/default/small';

/**
 * Roc action that runs after the clean command has been completed.
 */
export default function afterClean() {
    return () => () => log.success('Cleaned build directories!');
}
