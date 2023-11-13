/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    const arr = Array(num1.length + num2.length).fill(0);
    let extra = 0;
    for (let i = num2.length - 1; i >= 0; i--) {
        extra = 0;
        for (let j = num1.length - 1; j >= 0; j--) {
            const currentPlaceholder = arr[i + j + 1] || 0;
            const miniProd = Number(num2[i]) * Number(num1[j]) + extra + currentPlaceholder;
            extra = Math.floor(miniProd / 10);
            const ones = miniProd % 10;
            arr[i + j + 1] = ones;
        }
        if (extra) {
            arr[i] += extra;
        }
    }
    if (arr[0] === 0) {
        arr.shift();
    }
    return arr.join('');
};

console.log(multiply('9', '9'));
console.log(multiply('123', '456')); //56088
console.log(multiply('123456789', '987654321')); // 121932631112635269
