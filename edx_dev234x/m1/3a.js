// chaining by Continuation Passing Style (YUK)

function myFunction(x, callback) {
    callback(x);
}

var answer = 0;

myFunction(10, function (x) { //callback1
    var result = x ** 2  // 100

    myFunction(result, function (x) { //callback2
        var result2 = x + x  // 200

        myFunction(result2, function (x) { //callback 3
            answer = x + 100  // 300
            console.log(answer)
        })
    })
});