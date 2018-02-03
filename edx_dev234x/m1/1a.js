function funcA() {
    funcB();
}

function funcB() {
    funcC();
}

function funcC() {
    console.log(Error().stack); //Error is only used to show the call stack
}

funcA();