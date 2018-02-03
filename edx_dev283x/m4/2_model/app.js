const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/hello', {useMongoClient: true})

let Book = mongoose.model('Book', {
    name: String,
    published: Boolean,
    created: Date,
    updated: {type: Date, default: Date.now}
})

let aBook = new Book({
    name: 'A book',
    author: 'An Author', // discarded
    created: Date.now()
})

if(aBook.isNew) {
    console.log(aBook.name, 'is a new book, save it')
    aBook.save((err, product) => {
        if(err) {
            console.error(err)
            process.exit(1)
        }
        else {
            console.log('Saved:', product.name)
            if(aBook.isNew) {
                console.error('This should not happen')
            }
            console.log('Published?', aBook.published)
            Book.findOne({_id: aBook.id}, 'name', (err, res) => {
                console.log('Book name as json:', res.toJSON())
                console.log(res.id)
                // res.published = true
                // res.save(process.exit)
                res.remove(process.exit)
            })
        }
    })
}

