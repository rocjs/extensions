import createBasepathSupportMiddleware from './basepathSupport';

describe('middlewares/basepathSupport', () => {
    const next = async () => {};

    it('should throw an error when basepath does not start with "/"', () => {
        const veryWrongBasepath = 'veryWrongBasepath';
        expect(() => {
            createBasepathSupportMiddleware(veryWrongBasepath);
        }).toThrowError(`The basepath must start with "/", was ${veryWrongBasepath}`);
    });

    it('should set new ctx.path with eased basepath', async () => {
        const basepath = '/basepath';
        const ctx = { path: '/basepath/application' };
        const basepathMiddleware = createBasepathSupportMiddleware(basepath);
        await basepathMiddleware(ctx, next);

        expect(ctx.path).toEqual('/application');
    });

    it('should set new ctx.path to "/" if its the same as basepath', async () => {
        const basepath = '/basepath';
        const ctx = { path: '/basepath' };
        const basepathMiddleware = createBasepathSupportMiddleware(basepath);
        await basepathMiddleware(ctx, next);

        expect(ctx.path).toEqual('/');
    });

    it('should return an undefined when basepath is different than "/" and no new path is set', async () => {
        const basepath = '/';
        const ctx = { path: '/' };
        const basepathMiddleware = createBasepathSupportMiddleware(basepath);
        const result = await basepathMiddleware(ctx, next);

        expect(result).toEqual(undefined);
    });
});
