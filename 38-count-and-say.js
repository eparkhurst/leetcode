/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let count = 1;
    let digiString = '1';
    while (count < n) {
        let last = digiString[0];
        let digiCount = 0;
        let nextString = '';
        for (let i = 0; i < digiString.length; i++) {
            const num = digiString[i];
            if (num == last) {
                digiCount++;
            } else {
                nextString = `${nextString}${digiCount}${last}`;
                last = '' + num;
                digiCount = 1;
            }
        }
        nextString = `${nextString}${digiCount}${last}`;
        count++;
        digiString = nextString;
    }
    return digiString;
};

console.log(countAndSay(1));
console.log(countAndSay(2));
console.log(countAndSay(3));
console.log(countAndSay(4));
console.log(countAndSay(5));
