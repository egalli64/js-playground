const EventEmitter = require('events')

class Job extends EventEmitter {
    constructor(ops) {
        super(ops)
        this.on('start', () => {
            this.process()
        })
    }

    process() {
        setTimeout(() => {
            // Emulate the delay of the job - async!
            this.emit('done', { completedOn: new Date() })
        }, 1000)
    }
}

module.exports = Job