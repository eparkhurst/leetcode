/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (!nums.length) return 0;
    const mid = Math.floor(nums.length / 2);
    if (nums[mid] === target) return mid;
    if (nums.length === 1) {
        if (nums[0] > target) return 0;
        return 1;
    }
    if (nums[mid] > target) return searchInsert(nums.slice(0, mid), target);
    if (nums[mid] < target) return 1 + mid + searchInsert(nums.slice(mid + 1), target);
};

// console.log(searchInsert([1, 3, 5, 6], 5)); // 2
// console.log(searchInsert([1, 3, 5, 6], 2)); // 1
// console.log(searchInsert([1, 3, 5, 6], 7)); // 4
console.log(searchInsert([1, 3], 4)); // 2
