/**
 * fetch {id: 101}
 */
let initObject = {
    method: 'POST', // GET, HEAD, POST, PUT, DELETE
    headers: new Headers(),
    mode: 'cors', // same-origin or cors (cross origin HTTP request)
    body: '{}' // a json string used to send data
}

let url = 'https://jsonplaceholder.typicode.com/posts'

window.onload = () => {
    fetch(url, initObject)
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
}