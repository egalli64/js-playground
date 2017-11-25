const http = require('http')
const postData = JSON.stringify({ foo: 'bar' })

const options = {
    hostname: 'mockbin.com',
    port: 80,
    path: '/request?foo=bar&foo=baz',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const request = http.request(options, (response) => {
    response.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
        console.log('No more data in response.')
    })
})

request.on('error', (e) => {
    console.error(`problem with request: ${e.message}`)
})

request.write(postData)
request.end()