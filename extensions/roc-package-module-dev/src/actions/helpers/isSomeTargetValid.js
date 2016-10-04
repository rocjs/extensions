export default function isSomeTargetValid(targets) {
    return ['cjs', 'esm'].some((target) => targets.indexOf(target) > -1);
}
