window.onload = init

let cells
let checkingCells
let gameStarted
let chrono
let matchingPairs
let ready
let gridStyle

function init() {
    document.querySelector('#restart').addEventListener('click', reset)
    cells = document.querySelectorAll('td')
    gridStyle = document.querySelector("#gridTable").style

    setup()
    reset()
}

function setup() {
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i]

        cell.addEventListener("mouseenter", function () {
            if (!this.matching && !this.selected)
                this.style.background = "orange"
        })

        cell.addEventListener("mouseleave", function () {
            if (!this.matching && !this.selected)
                this.style.background = "blue"
        })

        cell.addEventListener('click', function () {
            if (ready == false)
                return;

            if (!chrono) {
                var time = 0
                chrono = setInterval(() => document.getElementById("timer").innerHTML = ++time, 1000)
                gameStarted = true
            }

            if (!this.matching && !this.selected) {
                checkingCells.push(this)
                this.style.backgroundColor = "red"
                this.innerHTML = this.value
                this.selected = true
            }

            if (checkingCells.length == 2) {
                checkMatches()
            }
        });
    }
}

function reset() {
    var answers = randomValues()

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i]

        cell.matching = false
        cell.selected = false
        cell.value = answers[i]

        hide(cell)
    }

    document.getElementById("timer").innerHTML = 0
    chronoOff()

    checkingCells = []
    matchingPairs = 0
    gameStarted = false
    ready = true
}

function checkMatches() {
    if (checkingCells[0].value == checkingCells[1].value) {
        setMatching(checkingCells[0])
        setMatching(checkingCells[1])

        checkingCells = []
        matchingPairs++

        if (matchingPairs == 4) {
            alert("You won!")
            chronoOff()
            ready = false
        }
    }
    else {
        ready = false
        gridStyle.border = "5px solid red"

        setTimeout(() => {
            hide(checkingCells[0])
            hide(checkingCells[1])

            checkingCells = []

            ready = true
            gridStyle.border = "5px solid black"
        }, 500)
    }
}

function randomValues() {
    let result = [1, 1, 2, 2, 3, 3, 4, 4, 5]
    for (let i = result.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))

        let buffer = result[j]
        result[j] = result[i]
        result[i] = buffer
    }
    return result
}

function hide(cell) {
    cell.style.backgroundColor = "blue"
    cell.innerHTML = ""
    cell.selected = false
}

function setMatching(cell) {
    cell.matching = true
    cell.style.backgroundColor = "purple"
}

function chronoOff() {
    if (chrono)
        clearInterval(chrono)
    chrono = null
}