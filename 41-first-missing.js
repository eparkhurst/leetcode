/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    nums.sort((a, b) => a - b);
    if (nums.length < 2) {
        return nums[0] === 1 ? 2 : 1;
    }
    let one = false;
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        if (num < 1) continue;
        if (num === 1) one = true;
        if (!one && num > 1) return 1;
        if (nums[i] + 1 !== nums[i + 1]) {
            if (nums[i] === nums[i + 1]) continue;
            return nums[i] + 1;
        }
    }
    return one ? nums[nums.length - 1] + 1 : 1;
};

console.log(firstMissingPositive([1, 2, 0])); // 3
console.log(firstMissingPositive([3, 4, -1, 1])); //2
console.log(firstMissingPositive([7, 8, 9, 11, 12])); //1
console.log(firstMissingPositive([1, 0])); // 2
console.log(firstMissingPositive([-1, -2])); // 1
console.log(firstMissingPositive([0, 2, 2, 1, 1])); // 3
console.log(firstMissingPositive([0, -1, 3, 1])); // 2
