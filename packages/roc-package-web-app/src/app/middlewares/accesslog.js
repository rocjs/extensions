import util from 'util';

import moment from 'moment';

/*
 Implementation based on koa-accesslog
 */
export default function accesslog(stream = process.stdout) {
    return async function(ctx, next) {
        await next();

        const format = '%s - - [%s] "%s %s HTTP/1.X" %d %s\n';
        const length = ctx.length ? ctx.length.toString() : '-';
        const date = moment().format('D/MMM/YYYY:HH:mm:ss ZZ');

        stream.write(util.format(format, ctx.ip, date, ctx.method, ctx.path, ctx.status, length));
    };
}
