// minimal http server
const http = require('http')
const port = 3000
http.createServer((request, response) => {
    //response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.statusCode = 200
    response.end()
}).listen(port)