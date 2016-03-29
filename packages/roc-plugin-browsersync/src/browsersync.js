import browserSync from 'browser-sync';

// To make sure we only init Browsersync once
let once = false;

export default ({ settings }) => {
    if (settings.dev.browsersync.enabled && !once) {
        once = true;
        return (port, path) => () => {
            browserSync({
                port: settings.dev.browsersync.port,
                // This proxy will remove extra slashes from the path, important to note
                proxy: `0.0.0.0:${port}${path}`,
                snippetOptions: {
                    rule: {
                        match: /<\/body>/i,
                        fn: (snippet, match) => {
                            // The logic here is to make sure we don't override options set by something else
                            // We merge if the debug option has changed since we touched it last
                            const debugOptions = (
                                `<script>
                                if (localStorage.debugTemp === localStorage.debug) {
                                    localStorage.debug = '${settings.dev.debug}';
                                } else {
                                    localStorage.debug = localStorage.debug + ',${settings.dev.debug}';
                                }
                                localStorage.debugTemp = localStorage.debug;
                                </script>`
                            );
                            return debugOptions + snippet + match;
                        }
                    }
                },
                open: settings.dev.browsersync.open,
                ui: {
                    port: settings.dev.browsersync.port + 1
                }
            });
        };
    }
};
