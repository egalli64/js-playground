const fs = require('fs')
const path = require('path')

// filename = path.join(__dirname, 'data', 'customers.csv');  // ENOENT
filename = path.join(__dirname, 'message.txt');


fs.readFile(filename, { encoding: 'utf-8' }, function (error, data) {
    if (error) {
        return console.error(error);  
    }
    
    console.log('Read from', filename, '-', data);
})