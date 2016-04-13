import { infoObject } from 'roc/validators';
import { toArray } from 'roc/converters';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

import { name, version } from './util';

export default {
    name,
    version,
    config,
    meta,
    hooks: {
        'run-test-command': {
            description: 'Use to add things that should react to the build command being called.'
        }
    },
    postInit: ({ meta: { settings } }) => {
        // If we do not have any metaSettings we will use a fallback
        // This is to get good documentation generation
        const targets =
            settings && settings.validations && settings.validations.build && settings.validations.build.targets ?
                settings.validations.build.targets :
                () => infoObject('Context based');
        return {
            meta: {
                commands: {
                    test: {
                        arguments: [{
                            name: 'targets',
                            validation: targets,
                            description: 'The targets the project should be tested for, ' +
                                'overrides the settings if provided',
                            converter: toArray
                        }]
                    }
                }
            }
        };
    }
};
