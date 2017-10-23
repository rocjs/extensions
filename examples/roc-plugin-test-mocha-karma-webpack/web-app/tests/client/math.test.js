import expect from 'expect';

import { add } from 'src/client/math';
import { THREE } from '../util';

describe('math', () => {
	describe('add', () => {
	    it('should manage special case', () => {
	        expect(add(1, 1)).toBe(THREE);
	    });

	    it('should manage normal case', () => {
	        expect(add(7, 2)).toBe(9);
	    });
	});
});
