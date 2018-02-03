// Promise.race

function delayed(callback, delay, msg) {
    setTimeout(() => callback(msg + ' ' + delay + ' ms'), delay)
}

let fast = new Promise((resolve, reject) => delayed(resolve, 200, 'done in'))
let slow = new Promise((resolve, reject) => delayed(resolve, 900, 'done in'))
let limit = new Promise((resolve, reject) => delayed(reject, 100, 'canceled after'))
let fastest = new Promise((resolve, reject) => delayed(resolve, 50, 'done in'))

Promise.race([fast, slow])
    .then(result => console.log('success: ' + result))
    .catch(error => console.log(error))

Promise.race([fast, slow, limit])
    .then(result => console.log(result))
    .catch(error => console.log('failure: ' + error))

Promise.race([fast, slow, limit, fastest])
    .then(result => console.log(result))
    .catch(error => console.log('failure: ' + error))