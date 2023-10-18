/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    let i = 0;
    while (i < nums.length) {
        if (nums[i] == '_') {
            console.log(nums);
            return i;
        }
        if (nums[i] == val) {
            nums.splice(i, 1);
            nums.push('_');
        } else {
            i++;
        }
    }
};

console.log(removeElement([3, 2, 2, 3], 3));
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
