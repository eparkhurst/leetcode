/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    const middle = Math.floor(nums.length / 2);
    if (nums[middle] === target) {
        let start = middle;
        let end = middle;
        for (let i = 0; i < nums.length; i++) {
            const low = nums[middle - i];
            const high = nums[middle + i];
            if (low === target) {
                start = middle - i;
            }
            if (high === target) {
                end = middle + i;
            }
            if (low !== target && high !== target) {
                break;
            }
        }
        return [start, end];
    } else if (nums[middle] > target) {
        return searchRange(nums.slice(0, middle), target);
    } else if (nums[middle] < target) {
        const [start, end] = searchRange(nums.slice(middle + 1), target);
        if (start === -1 && end === -1) return [-1, -1];
        return [1 + middle + start, 1 + middle + end];
    }
    return [-1, -1];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]
console.log(searchRange([], 0)); // [-1, -1]
console.log(searchRange([1], 1)); // [0,0]
console.log(searchRange([1, 2, 3], 3)); // [0,0]
