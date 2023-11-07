/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    const results = [];
    const cDict = candidates.reduce((d, num) => {
        d[num] ? d[num]++ : (d[num] = 1);
        return d;
    }, {});
    const resultsDict = {};

    const getCombos = (cans, combo, target) => {
        if (target === 0) {
            const sorted = combo.sort((a, b) => a - b);
            const key = sorted.toString();
            if (!resultsDict[key]) {
                resultsDict[key] = true;
                results.push(sorted);
            }
            return;
        }
        const candidates = [...Object.keys(cans)];
        for (let i = 0; i < Object.keys(cans).length; i++) {
            const num = candidates[i];
            if (num > target) {
                break;
            }
            const next = { ...cans };
            next[num]--;
            if (next[num] < 1) delete next[num];
            getCombos(next, [...combo, num], target - num);
        }
    };
    getCombos(cDict, [], target);
    return results;
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
console.log(combinationSum2([2, 5, 2, 1, 2], 5));
console.log(combinationSum2([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 27));
console.log(
    combinationSum2([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 27),
);

// Not the most efficient but it works. I would love to get around sorting and checking to prevent dupes
