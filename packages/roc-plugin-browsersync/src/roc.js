import { config, meta } from './config';
import initBrowsersync from './browsersync';

export default {
    name: require('../package.json').name,
    config,
    meta,
    actions: {
        browsersync: {
            hook: 'server-started',
            description: 'Adds a Browsersync instance.',
            action: () => initBrowsersync
        }
    }
};
