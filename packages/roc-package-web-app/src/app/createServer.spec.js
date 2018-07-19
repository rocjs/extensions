import { readFileSync as readFileSyncMock } from 'fs';
import { createServer as createHttpServerMock } from 'http';
import { createServer as createHttpsServerMock } from 'https';

import Koa from 'koa';
import serveMiddlewareMock from 'koa-static';
import removeTrailingSlashMiddlewareMock from 'koa-remove-trailing-slashes';
import normalizePathMiddlewareMock from 'koa-normalize-path';
import lowercasePathMiddlewareMock from 'koa-lowercase-path';
import addTrailingSlashMiddlewareMock from 'koa-add-trailing-slashes';

import basepathMiddlewareMock from './middlewares/basepathSupport';
import createServer from './createServer';

jest.mock('roc', () => ({
    getSettings: () => {},
    merge: (_, a) => a,
    getAbsolutePath: a => a,
}));
jest.mock('./middlewares/basepathSupport', () => jest.fn(() => function basepath() {}));
jest.mock('koa-remove-trailing-slashes', () => jest.fn(() => function removeTrailingSlash() {}));
jest.mock('koa-static', () => jest.fn(() => function serve() {}));
jest.mock('koa-normalize-path', () => jest.fn(() => function normalizePath() {}));
jest.mock('koa-lowercase-path', () => jest.fn(() => function lowercasePath() {}));
jest.mock('koa-add-trailing-slashes', () => jest.fn(() => function addTrailingSlash() {}));
jest.mock('fs');
jest.mock('http', () => ({
    createServer: jest.fn(() => ({
        listen: jest.fn(() => 'http'),
    })),
}));
jest.mock('https', () => ({
    createServer: jest.fn(() => ({
        listen: jest.fn(() => 'https'),
    })),
}));


describe('createServer', () => {
    let options;
    let beforeUserMiddlewares;
    let params;

    beforeEach(() => {
        options = {
            koa: {
                staticServe: {
                    maxage: 42,
                },
                normalize: {
                    enabled: false,
                    defer: false,
                },
                lowercase: {
                    enabled: false,
                    defer: false,
                },
                trailingSlashes: {
                    enabled: false,
                    defer: false,
                },
            },
            serve: '/static',
            port: 4000,
            https: {
                port: 4001,
                key: '/pathtokey',
                cert: '/pathtocert',
            },
        };
        beforeUserMiddlewares = [];
        params = {
            useDefaultKoaMiddlewares: false,
            hasKoaMiddlewares: false,
            koaMiddlewares: {
                default: () => [],
            },
            dev: false,
            dist: false,
            rocPath: '/rocPath',
        };
    });

    afterEach(() => {
        basepathMiddlewareMock.mockClear();
        removeTrailingSlashMiddlewareMock.mockClear();
        serveMiddlewareMock.mockClear();
    });

    it('should return object with Koa server and start function', () => {
        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server).toBeInstanceOf(Koa);
        expect(result.start).toBeInstanceOf(Function);
    });

    it('should add predefined set of middlewares to the Koa instance', () => {
        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toEqual(3);
        expect(result.server.middleware.map(f => f.name))
            .toEqual(['basepath', 'removeTrailingSlash', 'serve']);
        expect(basepathMiddlewareMock).toHaveBeenCalledWith(params.rocPath);
        expect(removeTrailingSlashMiddlewareMock).toHaveBeenCalled();
        expect(serveMiddlewareMock).toHaveBeenCalledWith(options.serve, expect.anything());
    });

    it('should add defaultKoaMiddlewares to Koa instance if proper param is set to true', () => {
        params.useDefaultKoaMiddlewares = true;

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toEqual(6);
        expect(result.server.middleware.map(f => f.name))
            .toEqual(['basepath', 'middleware', 'etag', 'logger', 'removeTrailingSlash', 'serve']);
    });

    it('should include beforeUserMiddleware to Koa instance', () => {
        beforeUserMiddlewares = [
            function middlewareOne() {},
            function middlewareTwo() {},
        ];

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toEqual(5);
        expect(result.server.middleware.map(f => f.name))
            .toEqual(['basepath', 'middlewareOne', 'middlewareTwo', 'removeTrailingSlash', 'serve']);
    });

    it('should include koaMiddlewares to Koa instance', () => {
        const koaMiddlewaresMock = jest.fn(() => [
            function koaMiddlewareOne() {},
            function koaMiddlewareTwo() {},
        ]);
        params.hasKoaMiddlewares = true;
        params.koaMiddlewares.default = koaMiddlewaresMock;

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toEqual(5);
        expect(result.server.middleware.map(f => f.name))
            .toEqual(['basepath', 'koaMiddlewareOne', 'koaMiddlewareTwo', 'removeTrailingSlash', 'serve']);
        expect(koaMiddlewaresMock).toHaveBeenCalledWith(options, { server: expect.anything() });
    });

    it('should call serve for each path defined in options', () => {
        const pathsToServe = ['/assets', '/static', '/kappa'];
        options.serve = pathsToServe;

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toEqual(5);
        expect(result.server.middleware.map(f => f.name))
            .toEqual(['basepath', 'removeTrailingSlash', 'serve', 'serve', 'serve']);
        expect(serveMiddlewareMock).toHaveBeenCalledTimes(3);
        expect(serveMiddlewareMock).toHaveBeenCalledWith(pathsToServe[0], expect.anything());
        expect(serveMiddlewareMock).toHaveBeenCalledWith(pathsToServe[1], expect.anything());
        expect(serveMiddlewareMock).toHaveBeenCalledWith(pathsToServe[2], expect.anything());
    });

    it('should include normalizePath to Koa instance when proper option is set to true', () => {
        options.koa.normalize.enabled = true;

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toBe(4);
        expect(result.server.middleware.map(f => f.name)).toContain('normalizePath');
        expect(normalizePathMiddlewareMock).toHaveBeenCalledWith({ defer: options.koa.normalize.defer });
    });

    it('should include normalizePath to Koa instance when proper option is set to true', () => {
        options.koa.lowercase.enabled = true;

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toBe(4);
        expect(result.server.middleware.map(f => f.name)).toContain('lowercasePath');
        expect(lowercasePathMiddlewareMock).toHaveBeenCalledWith({ defer: options.koa.lowercase.defer });
    });

    it('should include koa-trailing-slashes instead of koa-remove-trailing-slash when proper option is set', () => {
        options.koa.trailingSlashes.enabled = true;

        const result = createServer(options, beforeUserMiddlewares, params);

        expect(result.server.middleware.length).toBe(3);
        expect(result.server.middleware.map(f => f.name)).toContain('addTrailingSlash');
        expect(addTrailingSlashMiddlewareMock).toHaveBeenCalledWith({ defer: options.koa.trailingSlashes.defer });
    });

    it('should return servers after calling start function', () => {
        const result = createServer(options, beforeUserMiddlewares, params).start();

        expect(result).toEqual({ http: expect.anything(), https: expect.anything() });
        expect(readFileSyncMock).toHaveBeenCalledTimes(2);
        expect(readFileSyncMock).toHaveBeenCalledWith(options.https.key);
        expect(readFileSyncMock).toHaveBeenCalledWith(options.https.cert);
        expect(createHttpServerMock).toHaveBeenCalled();
        expect(createHttpsServerMock).toHaveBeenCalled();
    });
});
