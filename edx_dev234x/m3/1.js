/**
 * Fetch { "userId": 1, "id": 1, "title": "delectus aut autem", "completed": false }
 */

let goodUrl = 'https://jsonplaceholder.typicode.com/todos/1'
let badUrl = 'https://jsonplaceholder.typicode.com/bad_url/1'

window.onload = () => {
    // fetch as json
    fetch(goodUrl)
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))

    // fetch as text
    fetch(goodUrl)
        .then(result => result.text())
        .then(json => console.log(json))
        .catch(err => console.log(err))

    fetch(badUrl)
        .then(result => {
            console.log(result);
            if (result.ok) { //status is within 200-299
                return result.text()
            }
            else {
                console.log('reject request with status', result.status)
                return Promise.reject(result.status)
            }
        })
        .then(json => console.log(json))
        .catch(err => console.log('fetch error:', err))
}