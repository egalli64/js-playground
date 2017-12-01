const mongodb = require('mongodb')
const async = require('async')

const url = 'mongodb://localhost:27017/edx-course-db'
const customers = require('./m3-customer-data.json')
const customerAddresses = require('./m3-customer-address-data.json')

let tasks = []

const x = parseInt(process.argv[2])
const limit = (isNaN(x) || x < 0 || x > customers.length) ? customers.length : x

if (customers.length % limit) {
    console.log(`WARNING: the last ${customers.length % limit} customer(s) won't be generated!`)
}

mongodb.MongoClient.connect(url, (error, db) => {
    if (error) {
        console.log('Error:', error.message)
        process.exit(1)
    }

    customers.forEach((customer, index) => {
        customers[index] = Object.assign(customer, customerAddresses[index])
    })

    for (let beg = 0, end = limit; end <= customers.length; beg += limit, end += limit) {
        tasks.push((callback) => {
            console.log(`Processing [${beg}-${end}) in [0-${customers.length})`)
            db.collection('customers').insert(customers.slice(beg, end), (error, results) => {
                callback(error, results)
            })
        })
    }

    console.log(`Launching ${tasks.length} parallel task(s)`)
    const startTime = Date.now()
    async.parallel(tasks, (error, results) => {
        if (error) {
            console.error(error)
        }
        else {
            console.log(`${results.length} task(s) executed in ${Date.now() - startTime} ms.`)
        }
        db.close()
    })
})