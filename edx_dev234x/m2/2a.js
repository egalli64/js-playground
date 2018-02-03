let promise = Promise.resolve('hello')

let p2 = promise.then(result => {
    console.log(result)
    return result + ' world'
})

p2.then(result => console.log(result))

let p3 = Promise.resolve([1, 2, 3, 4]);

p3.then(result => {
    console.log(result)
    return result.map(x => x * x)
}).then(r2 => {
    console.log(r2)
    return r2.filter(x => x > 10)
}).then(r3 => {
    console.log(r3)
    return r3.toString() + "!!"
}).then(r4 => {
    console.log(r4)
    return r4;
}).catch(error => console.log(error));