/**
 * fetch {id: 101}
 */
let request = new Request(
    'https://jsonplaceholder.typicode.com/posts',
    {
        method: 'POST',
        headers: new Headers(),
        mode: 'cors',
        body: "{}"
    }
)

window.onload = () => {
    fetch(request)
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))

    // reusing a request in a POST-PUT fetch leads to Exception
/*
    fetch(request)
        .then(result => result.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
 */
}
