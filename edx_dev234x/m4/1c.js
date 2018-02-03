function* genFuncA() {
    yield 'a'
    yield 'b'
    yield 'c'

    return 'done with genFuncA()!'
}

function* genFuncB(){
    yield 1
    yield* genFuncA() // contains iterable [a,b,c]
    yield 2
    yield 3

    return 'done with genFuncB()!'
}

var genObject = genFuncB()

var a = genObject.next() // Object {value: 1, done: false}
var b = genObject.next() // Object {value: 'a', done: false}
var c = genObject.next() // Object {value: 'b', done: false}
var d = genObject.next() // Object {value: 'c', done: false}
var e = genObject.next() // Object {value: 2, done: false}
var f = genObject.next() // Object {value: 3, done: false}
var g = genObject.next() // Object {value: 'done with genFuncB()!', done: true}
var h = genObject.next() // Object {value: undefined, done: true}

console.log(a, b, c, d, e, f, g, h)