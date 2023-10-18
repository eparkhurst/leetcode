/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    let i = 0;
    let neg = false;
    if (dividend < -Math.pow(2, 31)) {
        return -Math.pow(2, 31);
    }

    if (dividend > Math.pow(2, 31) - 1) {
        return Math.pow(2, 31) - 1;
    }

    if (divisor < 0 && dividend > 0) {
        divisor = -divisor;
        neg = true;
    }
    if (divisor > 0 && dividend < 0) {
        dividend = -dividend;
        neg = true;
    }
    if (divisor < 0 && dividend < 0) {
        divisor = -divisor;
        dividend = -dividend;
    }
    if (divisor == 1) {
        if (!neg && dividend > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
        return neg ? -dividend : dividend;
    }
    let workingNum = divisor;

    while (i < Math.pow(2, 31)) {
        if (workingNum > dividend) {
            return neg ? -i : i;
        } else {
            workingNum += divisor;
            i++;
        }
    }
    return neg ? -Math.pow(2, 31) : Math.pow(2, 31) - 1;
};

console.log(divide(10, 3));
console.log(divide(7, -3));
console.log(divide(-2147483648, 1));
