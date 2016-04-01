import {
    isPath
} from 'roc/validators';

export default {
    settings: {
        descriptions: {
            runtime: {
                startBundle: 'Relative path to a bundle to start when calling "start", is not needed in most cases.'
            }
        },

        validations: {
            runtime: {
                startBundle: isPath
            }
        }
    },

    commands: {
        start: {
            settings: ['runtime'],
            description: 'Starts the current project.',
            arguments: [{
                name: 'artifact',
                validation: isPath,
                description: 'Path to an artifact to start.'
            }]
        }
    }
};
