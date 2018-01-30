import { format as formatMock } from 'util';

import createAccessLogMiddleware from './accesslog';

jest.mock('util', () => ({
    format: jest.fn(),
}));

describe('middlewares/accesslog', () => {
    const next = async () => {};

    afterEach(() => {
        formatMock.mockClear();
    });

    it('should call write method of passed stream', async () => {
        const streamWriteMock = jest.fn();
        const streamMock = {
            write: streamWriteMock,
        };
        const accessLogMiddleware = createAccessLogMiddleware(streamMock);
        await accessLogMiddleware({}, next);

        expect(streamWriteMock).toHaveBeenCalled();
    });

    it('should call util.format with certain ctx properties', async () => {
        const streamWriteMock = jest.fn();
        const streamMock = {
            write: streamWriteMock,
        };
        const accessLogMiddleware = createAccessLogMiddleware(streamMock);
        const ctx = {
            length: 42,
            ip: '127.0.0.1',
            method: 'GET',
            path: '/app',
            status: 200,
        };
        await accessLogMiddleware(ctx, next);

        expect(formatMock).toHaveBeenCalledWith(
            '%s - - [%s] \"%s %s HTTP/1.X\" %d %s\n',
            ctx.ip,
            expect.anything(),
            ctx.method,
            ctx.path,
            ctx.status,
            ctx.length.toString(),
        );
    });
});
