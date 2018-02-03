// Promise.all

var p1 = Promise.resolve('hello')
var p2 = Promise.resolve({ age: 2, height: 188 })
var p3 = 42
var p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > .99)
            resolve('success')
        else
            reject(new Error('failure'))
    }, 100)
})

Promise.all([p1, p2, p3])
    .then(results => console.log(results[0], JSON.stringify(results[1]), results[2]))
    .catch(error => console.log(error))

Promise.all([p1, p2, p4])
    .then(results => console.log(results))
    .catch(error => console.log(error))