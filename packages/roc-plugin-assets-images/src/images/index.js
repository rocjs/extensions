import { invokeHook } from '../roc/util';
import path from 'path';

export default () => ({ settings, previousValue: rocBuilder }) => () => () => {
    const maxSize = settings.build.assets.images.maxSize;

    let loaders = [
        {
            test: /\.(png|svg)$/,
            loader: `${require.resolve('url-loader')}?limit=${maxSize}`
        },
        {
            test: /\.(jpg)$/,
            loader: require.resolve('file-loader')
        }
    ];

    const modulesPath = path.join(__dirname, '../../node_modules');

    invokeHook('add-image')((imageLoaders) => {
        loaders = loaders.concat(imageLoaders);
    });

    rocBuilder.buildConfig.module.loaders.push(loaders);
    rocBuilder.buildConfig.resolveLoader.root.push(modulesPath);

    return rocBuilder;
};
