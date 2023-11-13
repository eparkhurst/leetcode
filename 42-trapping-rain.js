/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let rain = 0;
    let maxs = {};
    let max = 0;
    for (let i = 0; i < height.length; i++) {
        const h = height[i];
        if (h > height[i - 1]) {
        }
    }
    return rain;
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
