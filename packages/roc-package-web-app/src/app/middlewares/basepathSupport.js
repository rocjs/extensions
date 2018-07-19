import assert from 'assert';

/*
 Implementation based on koa-mount
*/
export default function basepathSupport(basepath) {
    assert(basepath.charAt(0) === '/', `The basepath must start with "/", was ${basepath}`);

    const trailingSlash = basepath.slice(-1) === '/';

    function matcher(path) {
        if (path.indexOf(basepath) !== 0) {
            return false;
        }

        const newPath = path.replace(basepath, '') || '/';

        if (trailingSlash) {
            return newPath;
        }

        if (newPath.charAt(0) !== '/') {
            return false;
        }

        return newPath;
    }

    return async function(ctx, next) {
        // Do nothing if the basepath is /
        if (basepath === '/') {
            return await next();
        }

        const newPath = matcher(ctx.path);
        if (newPath) {
            ctx.path = newPath;
            return await next();
        }

        // If the path does not match Koa will render a default 404 Not Found page.
        return undefined;
    };
}
