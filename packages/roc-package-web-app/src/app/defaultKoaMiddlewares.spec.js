import koaErrorMock from 'koa-error';
import koaHelmetMock from 'koa-helmet';
import koaEtagMock from 'koa-etag';
import koaLoggerMock from 'koa-logger';
import koaCompressMock from 'koa-compress';
import koaFaviconMock from 'koa-favicon';

import accessLogMock from './middlewares/accesslog';
import getKoaMiddlewares from './defaultKoaMiddlewares';

jest.mock('koa-error', () => jest.fn(() => function koaError() {}));
jest.mock('koa-helmet', () => jest.fn(() => function koaHelmet() {}));
jest.mock('koa-etag', () => jest.fn(() => function koaEtag() {}));
jest.mock('koa-logger', () => jest.fn(() => function koaLogger() {}));
jest.mock('koa-compress', () => jest.fn(() => function koaCompress() {}));
jest.mock('koa-favicon', () => jest.fn(() => function koaFavicon() {}));
jest.mock('./middlewares/accesslog', () => jest.fn(() => function accessLog() {}));


describe('defaultKoaMiddleware', () => {
    afterEach(() => {
        koaErrorMock.mockClear();
        koaHelmetMock.mockClear();
        koaEtagMock.mockClear();
        koaLoggerMock.mockClear();
        koaCompressMock.mockClear();
    });

    it('should return default array of middlewares even when all options are falsy', () => {
        const middlewares = getKoaMiddlewares({}, { dev: false, dist: false });

        expect(middlewares.length).toEqual(3);
        expect(middlewares.map(f => f.name)).toEqual(['koaHelmet', 'koaEtag', 'koaLogger']);
        expect(koaHelmetMock).toHaveBeenCalled();
        expect(koaEtagMock).toHaveBeenCalled();
        expect(koaLoggerMock).toHaveBeenCalled();
    });

    it('should include koa-error when dev is set to true', () => {
        const middlewares = getKoaMiddlewares({}, { dev: true, dist: false });

        expect(middlewares.length).toEqual(4);
        expect(middlewares.map(f => f.name)).toEqual(['koaError', 'koaHelmet', 'koaEtag', 'koaLogger']);
        expect(koaErrorMock).toHaveBeenCalled();
    });

    it('should include koa-compress and accessLog instead of koa-logger when dist is set to true', () => {
        const middlewares = getKoaMiddlewares({}, { dev: false, dist: true });

        expect(middlewares.length).toEqual(4);
        expect(middlewares.map(f => f.name)).toEqual(['koaHelmet', 'koaEtag', 'koaCompress', 'accessLog']);
        expect(koaCompressMock).toHaveBeenCalled();
        expect(accessLogMock).toHaveBeenCalled();
    });

    it('should include koa-favicon when favicon is specified in config', () => {
        const config = { favicon: './pathToFavicon.ico' };
        const middlewares = getKoaMiddlewares(config, { dev: false, dist: false });

        expect(middlewares.length).toEqual(4);
        expect(middlewares.map(f => f.name)).toEqual(['koaHelmet', 'koaEtag', 'koaFavicon', 'koaLogger']);
        expect(koaFaviconMock).toHaveBeenCalledWith(config.favicon);
    });
});
