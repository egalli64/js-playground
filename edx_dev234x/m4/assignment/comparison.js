window.onload = init

const baseUrl = 'https://swapi.co/api/starships/?page=1'
// const baseUrl = 'http://localhost:3000/starships/1'
let ships = []
let curShips = []
let headers = []
let cellMapping = [
    ['cost_in_credits'],
    ['max_atmosphering_speed'],
    ['cargo_capacity'],
    ['passengers']
]


function init() {
    run().then(() => {
        let sels = [document.querySelector('#selLeft'), document.querySelector('#selRight')]
        for (let ship of ships) {
            let option = newOption(ship.name)
            sels[0].add(option)
            sels[1].add(option.cloneNode(true))
        }

        curShips.push(ships[0])
        curShips.push(ships[0])
        selLeft.addEventListener('change', () => curShips[0] = ships[sels[0].selectedIndex])
        selRight.addEventListener('change', () => curShips[1] = ships[sels[1].selectedIndex])

        headers.push(document.querySelector('#nameLeft'))
        headers.push(document.querySelector('#nameRight'))
        cellMapping[0].push(document.querySelector('#costLeft'))
        cellMapping[0].push(document.querySelector('#costRight'))
        cellMapping[1].push(document.querySelector('#speedLeft'))
        cellMapping[1].push(document.querySelector('#speedRight'))
        cellMapping[2].push(document.querySelector('#sizeLeft'))
        cellMapping[2].push(document.querySelector('#sizeRight'))
        cellMapping[3].push(document.querySelector('#passLeft'))
        cellMapping[3].push(document.querySelector('#passRight'))
        document.querySelector('#btnCompare').addEventListener('click', () => compare())
    }).catch(err => alert(err))
}

function run() {
    const go = generator()

    function iterate(iteration) {
        if (iteration.done)
            return
        return Promise.resolve(iteration.value)
            .then(value => iterate(go.next(value)))
            .catch(value => iterate(go.throw(value)))
    }

    return iterate(go.next())
}

function* generator() {
    let url = baseUrl
    do {
        let shipsResponse = yield fetch(url)
        let page = yield shipsResponse.json()
        ships.push(...page.results)
        url = page.next
    } while (url)
}

function newOption(name) {
    let option = document.createElement('option')
    option.text = name
    return option
}

function compareFeature(index) {
    let feature = cellMapping[index][0]
    let left = cellMapping[index][1]
    let right = cellMapping[index][2]

    left.innerText = curShips[0][feature]
    right.innerText = curShips[1][feature]

    var lftFeature = parseInt(curShips[0][feature])
    var rgtFeature = parseInt(curShips[1][feature])

    let background = ['white', 'white']
    if (!isNaN(lftFeature) && !isNaN(rgtFeature)) {
        if (lftFeature > rgtFeature)
            background[0] = 'red'
        if (rgtFeature > lftFeature)
            background[1] = 'red'
    }
    left.setAttribute('style', 'background-color: ' + background[0])
    right.setAttribute('style', 'background-color: ' + background[1])
}

function compare() {
    headers[0].innerText = curShips[0].name
    headers[1].innerText = curShips[1].name

    for (let i = 0; i < cellMapping.length; i++) {
        compareFeature(i)
    }
}