const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/hello', { useMongoClient: true })

let Book = mongoose.model('Book', { name: String })

let aBook = new Book({ name: 'My book' })

aBook.save((error, result) => {
    if (error) {
        console.error(error)
        process.exit(1)
    }
    else {
        console.log('Saved:', result)
        process.exit(0)
    }
})