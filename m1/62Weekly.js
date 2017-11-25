var Job = require('./62Job.js')
var job = new Job()

console.log('Enter weekly module @', new Date())

job.on('done', function (details) {
    console.log('Weekly job done @', details.completedOn)
})

job.emit('start')