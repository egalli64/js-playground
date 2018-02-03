var promise = Promise.resolve('hello')

var p2 = promise.then(result => { 
    console.log(result)
    return Promise.resolve("12345")
})

p2.then(result => console.log(result));