/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    // start at the end and go backwards
    for (let i = nums.length - 1; i > 0; i--) {
        if (nums[i] > nums[i - 1]) {
            for (let j = nums.length - 1; j > i - 1; j--) {
                if (nums[j] > nums[i - 1]) {
                    [nums[i - 1], nums[j]] = [nums[j], nums[i - 1]];

                    let spliced = nums.splice(i);
                    spliced.sort((a, b) => a - b);
                    nums.push(...spliced);
                    return nums;
                }
            }
            console.log('shouldnt be here');
        }
    }
    return nums.sort((a, b) => a - b);
};

console.log(nextPermutation([2, 1, 4, 5, 3])); // [2,1,5,3,4]
