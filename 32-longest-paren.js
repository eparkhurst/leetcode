/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    if (s.length <= 1) {
        return 0;
    }

    const badParens = [];
    const openParens = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            openParens.push(i);
        } else if (openParens.length === 0) {
            badParens.push(i);
        } else {
            openParens.pop();
        }
    }
    if (openParens.length > 0) {
        badParens.push(...openParens);
    }
    if (badParens.length === 0) {
        return s.length;
    }
    badParens.push(s.length, -1);
    badParens.sort((a, b) => a - b);
    let longest = 0;
    for (let i = 1; i < badParens.length; i++) {
        const stretch = badParens[i] - badParens[i - 1] - 1;
        if (stretch > longest) {
            longest = stretch;
        }
    }
    return longest;
};

console.log(longestValidParentheses('(()')); // 2
console.log(longestValidParentheses(')()())')); // 4
console.log(longestValidParentheses('')); // 0
