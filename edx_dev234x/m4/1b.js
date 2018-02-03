function* genFunc() {
    yield 'a'
    yield 'b'
    throw new Error("error thrown by genFunc()!")
    yield 'c'
    yield 'd'
}

var genObject = genFunc();

try {
    console.log(genObject.next())
    console.log(genObject.next())
    console.log(genObject.next()) // error
}
catch (e) {
    console.log(e.message)
}