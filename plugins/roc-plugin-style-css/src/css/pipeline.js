export default function cssPipeline(
    cssLoader,
    loaders,
    isDist,
    sourceMap = false,
    cssModulesEnabled = true,
    preLoaders,
    minimize = true,
    postcssPlugins,
) {
    const cssLoaderConf = {
        loader: require.resolve(cssLoader),
        options: {
            sourceMap,
            minimize,
            importLoaders: loaders.length + preLoaders.length + 1,
        },
    };

    if (cssModulesEnabled) {
        cssLoaderConf.options.modules = true;

        cssLoaderConf.options.localIdentName = isDist
            ? '[hash:base64:5]'
            : '[path]_[name]__[local]___[hash:base64:5]';
    }

    return [
        ...preLoaders,
        cssLoaderConf,
        { loader: 'postcss-loader', options: { plugins: postcssPlugins } },
        ...loaders,
    ];
}
