// promise - then (- catch)
let promise = new Promise(function (resolve, reject) {
    let result = Math.random()
    setTimeout(function () {
        if (result > .5) {
            resolve('success')
        }
        else {
            reject(Error('failure'))
        }

    }, 1000)
})

promise.then(val => console.log(val)).catch(val => console.log(val));
// promise.then(val => console.log(val), val => console.log(val))