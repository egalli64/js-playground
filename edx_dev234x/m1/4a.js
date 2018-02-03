// setTimeout

console.log('before')

const a = setTimeout(function () {
    console.log('hello')
}, 100);

setTimeout(() => console.log('hello again'), 100);

console.log('after (in a way)')

// clearTimeout(a)