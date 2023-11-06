/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    let result = [];

    function findCombos(target, combo = [], index = 0) {
        if (target == 0) {
            result.push(combo);
            return;
        }
        if (target < 0) {
            return;
        }
        for (let i = index; i < candidates.length; i++) {
            const num = candidates[i];
            if (num > target) {
                continue;
            }
            findCombos(target - num, [...combo, num], i);
        }
    }

    findCombos(target);
    return result;
};

console.log(combinationSum([2, 3, 6, 7], 7));
console.log(combinationSum([2, 3, 5], 8));
console.log(combinationSum([2], 1));
