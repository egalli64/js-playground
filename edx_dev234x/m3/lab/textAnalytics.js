window.onload = init

let txtInput
let pOutput

function init() {
    document.querySelector('#btnAnalyze').addEventListener('click', analyze)
    txtInput = document.querySelector('#txtInput')
    pOutput = document.querySelector("#pOutput")
}

function analyze() {
    let initObject = {
        method: 'POST',
        body: JSON.stringify({
            'documents': [
                {
                    'language': 'en',
                    'id': 1,
                    'text': txtInput.value
                }
            ]
        }),
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'putHereYourSubscriptionKey'
        })
    }
    // let url = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases'
    let url = 'http://localhost:3000/keyPhrases'
    let request = new Request(url, initObject);

    fetch(request).then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(new Error(response.statusText));
        }
    }).then(response => {
        pOutput.innerHTML = 'Total Key Phrases: ' + response.documents[0].keyPhrases.length +
            '<br>' + response.documents[0].keyPhrases
    }).catch(err => {
        alert(err)
        pOutput.textContent = ''
    });

}


