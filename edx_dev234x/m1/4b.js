// setInterval - clearInterval

var count = 0;

const a = setInterval(function () {
    count++;
    console.log(count);
}, 1000);

setTimeout(function () {
    clearInterval(a)
}, 5050);
