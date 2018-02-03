console.log('I have loaded the utility module');

module.exports = function (numbersToSum) {
    let sum = 0;
    let i = 0;
    let len = numbersToSum.length;
    while (i < len) {
        sum += numbersToSum[i++];
    }
    return sum;
}