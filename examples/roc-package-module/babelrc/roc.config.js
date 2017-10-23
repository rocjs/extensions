module.exports = {
    babel: {
        presets: ['stage-1', 'react'],
        plugins: ['transform-decorators-legacy'],
        env: {
            production: {
                presets: ['react-optimize'],
            },
            hest: {
                presets: []
            }
        }
    }
}
