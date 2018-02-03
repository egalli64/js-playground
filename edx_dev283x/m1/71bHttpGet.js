const http = require('http')

const url = 'http://nodeprogram.com'
http.get(url, (response) => {
    let data;
    let count = 0;
    response.on('data', (chunk) => {
        count += 1;
        data += chunk;
    })
    response.on('end', () => {
        console.log(data);
        console.log(`response has ended with ${count} chunk(s)`);
    })
}).on('error', (error) => {
    console.error(`Got error: ${error.message}`)
})