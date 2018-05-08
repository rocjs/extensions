import { join } from 'path';

import qs from 'qs';

export default ({ context: { config: { settings } }, previousValue: webpackConfig }) => () => () => {
    webpackConfig.module.rules.push({
        test: new RegExp(`\.(${settings.build.assets.images.urlLoader.filetypes.join('|')})$`),
        use: [{
            loader: require.resolve('url-loader'),
            options: {
                // The url-loader will pass all additional query parameters to the file-loader if it exceeds the limit.
                ...settings.build.assets.images.fileLoader.options,
                ...settings.build.assets.images.urlLoader.options,
            },
        }],
    });

    webpackConfig.module.rules.push({
        test: new RegExp(`\.(${settings.build.assets.images.fileLoader.filetypes.join('|')})$`),
        use: [{
            loader: require.resolve('file-loader'),
            options: settings.build.assets.images.fileLoader.options,
        }],
    });

    // We want to be able to use the url-loader and the file-loader in projects without the user needing
    // to install them directly.
    webpackConfig.resolveLoader.modules.push(join(__dirname, '../../node_modules'));

    return webpackConfig;
};
