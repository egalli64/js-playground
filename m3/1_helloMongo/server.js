const mongodb = require('mongodb')
const mongo = mongodb.MongoClient

const url = 'mongodb://localhost:27017/hello'
const coll_name = 'students'

mongo.connect(url, (err, db) => {
    if (err) {
        console.log(err.message)
        process.exit(1)
    }
    console.log('Connected to Mongo')
    insertStudents(db, () => {
        updateStudent(db, () => {
            removeStudents(db, () => {
                findAllStudents(db, () => {
                    removeAllStudents(db, () => {
                        console.log('Job done, disconnecting')
                        db.close()
                    })
                })
            })
        })
    })
})

const insertStudents = (db, callback) => {
    const collection = db.collection(coll_name)
    collection.insert([{ name: 'AK' }, { name: 'BJ' }, { name: 'CY' }], (error, result) => {
        if (error) {
            console.log('Cannot insert:', error.message)
            process.exit(1)
        }
        console.log(`Inserted ${result.result.n} documents into ${coll_name}`)
        callback(result)
    })
}

const updateStudent = (db, callback) => {
    var collection = db.collection(coll_name)
    const name = 'BJ'
    collection.update({ name: name }, { $set: { grade: 'A' } }, (error, result) => {
        if (error) {
            console.log('Cannot update:', error.message)
            process.exit(1)
        }
        console.log(`Student ${name} updated`)
        callback(result)
    })
}

const removeStudents = (db, callback) => {
    const collection = db.collection(coll_name)
    const name = 'CY'
    collection.remove({ name: name }, (error, result) => {
        if (error) {
            console.log('Cannot remove:', error.message)
            process.exit(1)
        }
        console.log(`Removed ${result.result.n} student(s) named ${name}`)
        callback(result)
    })
}

const removeAllStudents = (db, callback) => {
    const collection = db.collection(coll_name)
    collection.remove({}, (error, result) => {
        if (error) {
            console.log('Cannot remove all:', error.message)
            process.exit(1)
        }
        console.log(`Removed ${result.result.n} students`)
        callback(result)
    })
}

const findAllStudents = (db, callback) => {
    var collection = db.collection(coll_name)
    collection.find({}).toArray((error, docs) => {
        if (error) {
            console.log('Cannot find all:', error.message)
            process.exit(1)
        }
        console.log(`Found ${docs.length} student(s):`, docs)
        callback(docs)
    })
}