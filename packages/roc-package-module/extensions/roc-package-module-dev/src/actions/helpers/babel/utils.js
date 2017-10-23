/**
 Parts of the code taken from babel-cli
*/

import fs from 'fs';
import path from 'path';

import { transform as transformCore, util } from 'babel-core';

export function chmod(src, dest) {
    fs.chmodSync(dest, fs.statSync(src).mode);
}

export const canCompile = util.canCompile;

export function addSourceMappingUrl(code, loc) {
    return code + '\n//# sourceMappingURL=' + path.basename(loc);
}

export function log(msg) {
    console.log(msg);
}

export function transform(filename, code, opts) {
    opts.filename = filename;

    const result = transformCore(code, opts);
    result.filename = filename;
    result.actual = code;
    return result;
}

export function compile(filename, opts, watch = false) {
    try {
        const code = fs.readFileSync(filename, 'utf8');
        return transform(filename, code, opts);
    } catch (err) {
        if (watch) {
            console.error(toErrorStack(err));
            return { ignored: true };
        }

        throw err;
    }
}

function toErrorStack(err) {
    // eslint-disable-next-line
    if (err._babel && err instanceof SyntaxError) {
        return `${err.name}: ${err.message}\n${err.codeFrame}`;
    }

    return err.stack;
}
