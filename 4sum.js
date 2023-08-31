/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const numSet = new Set()
    const dict = {}
    const smaller = []

    for (let i = 0; i < nums.length; i++) {
        num = nums[i]
        if (dict[num] === undefined) {
            dict[num] = 1
        } else if(dict[num] >= 4) {
            continue
        } else {
            dict[num] += 1
        }
        smaller.push(num)
    }
    sortedNums = smaller.sort((a,b) => (a-b))
    // console.log(sortedNums)
    for (let i = 0; i < sortedNums.length -3; i++) {
        for (let j = i+1; j < sortedNums.length -2; j++) {
            for (let k = j+1; k < sortedNums.length-1; k++) {
                for (let l = k+1; l < sortedNums.length; l++) {        
                    const testNum = sortedNums[i] + sortedNums[j] + sortedNums[k] + sortedNums[l]
                    if (testNum === target) {
                        const stringNums = [sortedNums[i], sortedNums[j], sortedNums[k], sortedNums[l]].sort((a,b) => a - b).join(',')
                        if (!numSet.has(stringNums)) {
                            numSet.add(stringNums)
                        } else {
                            break
                        }
                    }
                }
            }
        } 
    }
    return Array.from(numSet).map(num => num.split(',').map(n => Number(n)))
};

// console.log(fourSum([1,0,-1,0,-2,2], 0))
// console.log(fourSum([2,2,2,2,2], 8))
// console.log(fourSum([7,7,-1,-5,2,-2,8,-8,-10,0,1,-4,-1,4,-6,5,4], -21))
console.log(fourSum([0,2,2,2,10,-3,-9,2,-10,-4,-9,-2,2,8,7], 6))

