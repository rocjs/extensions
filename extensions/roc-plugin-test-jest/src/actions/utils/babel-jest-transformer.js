import babelJest from 'babel-jest';

import { invokeHook } from '../../roc/util';

// Jest tests never runs in an actuall browser, therefor it makes sense to default to "node" here.
module.exports = babelJest.createTransformer(invokeHook('babel-config', 'node'));
