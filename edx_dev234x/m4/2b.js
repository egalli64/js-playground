function* genFunc() {
    yield 'a'
    yield
    yield* [1, 2, 3]
    yield 123

    // return 'finished'
}

for (var x of genFunc())
    console.log(x)

var arr = [...genFunc()] //...spread operator
console.log('Spreading:', arr)

var [a,b,c,d,e,f,g] = genFunc(); //destructuring assignment
console.log('Destructuring:', a, b, c, d, e, f, g)