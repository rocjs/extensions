import { getSettings } from 'roc';
import data from './data.json';

const calculate = (input) => {
    return input * 5;
};

console.log(calculate(Math.random()));

console.log('Settings:', getSettings());

console.log(data);
