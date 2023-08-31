/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    let ans = ['('];
    for (let i = 0; i < n * 2 - 1; i++) {
        nextAns = [];
        for (let j = 0; j < ans.length; j++) {
            if (ans[j].match(/\(/g).length < n) nextAns.push(`${ans[j]}(`);
            if (ans[j].match(/\(/g).length > (ans[j].match(/\)/g) || []).length) nextAns.push(`${ans[j]})`);
        }
        ans = nextAns;
    }
    return ans;
};

console.log(generateParenthesis(3));
