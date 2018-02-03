function* genFunc() {
    var a = yield 'a'
    console.log(a) // a = 'a!'
    var b = yield 'b'
    console.log(b) // b = 'B'
    var c = yield 'c'
    console.log(c) // c = 'abc'

}

var genObject = genFunc()

var w = genObject.next() //starts genFunc(), w = Object {value: 'a', done: false}
var x = genObject.next(w.value + '!') //sends a value of "a!" to genFunc(), x = Object {value: 'b', done: false}
var y = genObject.next(x.value.toUpperCase()) //sends a value of 'B' to genFunc(), y = Object {value: 'c', done: false}
var z = genObject.next(w.value + x.value + y.value) //sends a value of 'abc' to genFunc(), z = Object {value: 'undefined', done: true}