import isPlainObject from 'lodash/isPlainObject';

/**
 * Returns a value from a potential object.
 *
 * @param {object} value - A potential object.
 * @param {string} property - The property to fetch from the potential object.
 *
 * @returns {object} - The value from the potential object.
 */
export default function getValueFromPotentialObject(value, property) {
    return isPlainObject(value) ? value[property] : value;
}
