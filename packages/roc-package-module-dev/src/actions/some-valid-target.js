export default function isSomeTargetValid(targets) {
    return ['es5', 'es6'].some((t) => targets.indexOf(t) > -1);
}
