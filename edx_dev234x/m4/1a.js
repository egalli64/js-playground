function* genFunc() {
    console.log('started')
    yield 'a'
    console.log('passed first yield')
    yield
    console.log('passed second yield')
    yield 123
    console.log('passed third yield')
        
    return 'finished'
}

var genObject = genFunc()
var a = genObject.next()
var b = genObject.next()
var c = genObject.next()
var d = genObject.next()
var e = genObject.next()

console.log(a, b, c, d, e)