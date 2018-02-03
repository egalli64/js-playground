const EventEmitter = require('events')

class Emitter extends EventEmitter { }
emitter = new Emitter()

emitter.on('knock', function () {
    console.log('Who\'s there?')
})

emitter.on('knock', function () {
    console.log('Go away!')
})

emitter.once('knock', function() {
    console.log('Just once')
})

emitter.emit('knock')
// emitter.removeAllListeners()
emitter.emit('knock')