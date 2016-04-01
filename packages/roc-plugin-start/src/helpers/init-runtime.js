import { runHookDirectly } from 'roc';
import { name } from '../roc/util';

export default function initRuntime() {
    // Init additional runtimes
    runHookDirectly({
        extension: name,
        name: 'register-runtime'
    });

    console.log('Roc runtime has been initialized.');
}
