window.onload = function () {
    let initObject = {
        method: 'POST',
        body: JSON.stringify({
            'documents': [
                {
                    'language': 'en',
                    'id': 1,
                    'text': 'a few words'
                }
            ]
        }),
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'putHereYourSubscriptionKey'
        })
    }

    let url = 'http://localhost:3000/keyPhrases'
    let request = new Request(url, initObject);

    fetch(request)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                return Promise.reject(new Error(response.statusText));
            }
        })
        .then(json => console.log(json.documents[0].keyPhrases))
        .catch(err => console.log(err))
}


