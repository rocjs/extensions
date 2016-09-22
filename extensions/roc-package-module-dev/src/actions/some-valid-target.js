export default function isSomeTargetValid(targets) {
    return ['es5', 'es6'].some((target) => targets.indexOf(target) > -1);
}
