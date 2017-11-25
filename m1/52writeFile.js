const fs = require('fs')

fs.writeFile('message.txt', 'Hello World!', function (error) {
    if (error)
        return console.error(error)
    else
        console.log('Writing is done.')
})