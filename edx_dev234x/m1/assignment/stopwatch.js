window.onload = init

let checks
let timer
let running
let interval
let curTime
let curRecord

function init() {
    checks = document.querySelector('#checks')
    timer = document.querySelector('#timer')
    reset()

    document.querySelector('#start').addEventListener('click', start)
    document.querySelector('#reset').addEventListener('click', reset)
    document.querySelector('#record').addEventListener('click', record)
}

function stop() {
    clearInterval(interval)
    running = false
}

function reset() {
    stop()
    curTime = 0
    setTimer()
    while (checks.lastChild) {
        checks.removeChild(checks.lastChild);
    }
    curRecord = 0
}

function setTimer() {
    timer.textContent = (curTime / 100).toFixed(2)
}

function start() {
    if (running) {
        stop()
    }
    else {
        interval = setInterval(() => {
            curTime += 1
            setTimer()
        }, 10)
        running = true
    }
}

function record() {
    if (!curTime || curTime == curRecord) {
        return
    }
    curRecord = curTime

    let item = document.createElement('li')
    item.textContent = (curRecord / 100).toFixed(2)
    checks.appendChild(item)
}