/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    let closest = Infinity
    for (let i = 0; i < nums.length -2; i++) {
        for (let j = i+1; j < nums.length -1; j++) {
            for (let k = j+1; k < nums.length; k++) {
                const testNum = nums[i] + nums[j] + nums[k]
                if (Math.abs(testNum - target) < Math.abs(closest - target) ) {
                    closest = testNum
                }
            }
        } 
    }
    return closest
};

threeSumClosest([0,0,0], 1)