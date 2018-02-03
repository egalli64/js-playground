window.onload = init

let url = 'https://swapi.co/api/films/'
// let url = 'http://localhost:3000/films/'
let input
let spnTitle
let ulCast

function init() {
    document.querySelector('#btnSearch').addEventListener('click', () => {
        run().catch(err => alert(err.message))
    })

    input = document.querySelector('#input')
    spnTitle = document.querySelector('#spnTitle')
    ulCast = document.querySelector('#ulCast')
}

function* generator() {
    if (input.value > 7 || input.value < 1) {
        throw new Error('Invalid Input - Enter a number between 1 and 7')
    }
    ulCast.innerHTML = ''

    let resFilm = yield fetch(url + input.value)
    let film = yield resFilm.json()
    spnTitle.innerText = film.title

    for (let peopleUrl of film.characters) {
        let resPeople = yield fetch(peopleUrl)
        let character = yield resPeople.json()
        addCharacterCast(character.name)
    }
}

function addCharacterCast(name) {
    let li = document.createElement('li')
    li.innerText = name
    ulCast.appendChild(li)
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