// back in event queue by setTimeout-zero

function asyncLog(value) {
    setTimeout(function () {
        console.log(value);
    }, 0)
}

console.log("first");
asyncLog("second");
console.log("third");
