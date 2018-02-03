var a = [1, 2, 3, 4, 5];

// map
const b = a.map(function (x) { return x * x; });
const c = a.map(x => x ** 2)

console.log(b);
console.log(c);

// filter
function isEven(x) { return x % 2 == 0 }

const d = a.filter(isEven)
const e = a.filter(x => x % 2 == 0)

console.log(d)
console.log(e)

