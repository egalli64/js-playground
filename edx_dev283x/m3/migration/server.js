const mongodb = require('mongodb')
const async = require('async')

const url = 'mongodb://localhost:27017/migration'
const coll_name = 'customers'
const customers = require('./m3-customer-data.json')
const customerAddresses = require('./m3-customer-address-data.json')

let tasks = []

const x = parseInt(process.argv[2])
const taskSize = (isNaN(x) || x < 0 || x > customers.length) ? customers.length : x

if (customers.length % taskSize) {
    console.log(`WARNING: the last ${customers.length % taskSize} customer(s) won't be generated!`)
}

mongodb.MongoClient.connect(url, (error, db) => {
    if (error) {
        console.log('Error:', error.message)
        process.exit(1)
    }

    customers.forEach((customer, index) => {
        customer = Object.assign(customer, customerAddresses[index])
    })

    for (let beg = 0, end = taskSize; end <= customers.length; beg += taskSize, end += taskSize) {
        tasks.push((callback) => {
            console.log(`Processing [${beg}-${end}) in [0-${customers.length})`)
            db.collection(coll_name).insert(customers.slice(beg, end), (error, results) => {
                callback(error, results)
            })
        })
    }

    console.log(`Launching ${tasks.length} parallel task(s)`)
    const tZero = Date.now()
    async.parallel(tasks, (error, results) => {
        if (error) {
            console.error(error)
        }
        else {
            console.log(`${results.length} task(s) executed in ${Date.now() - tZero} ms.`)
        }
        db.close()
    })
})