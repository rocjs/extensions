import { getSettings } from 'roc';

const calculate = (input) => {
    return input * 5;
};

console.log(calculate(Math.random()));

console.log('Settings:', getSettings());
