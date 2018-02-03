function calculate(x, y, compute) {
    return compute(x, y);
}

function adder(x, y) {
    return x + y
}

var a = calculate(10, 5, adder)

var b = calculate(10, 5, (x, y) => {
    return x * y
})

console.log(a)
console.log(b)