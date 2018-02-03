
// echo worker
self.addEventListener('message', function (e) {
	let message = e.data
	self.postMessage(message + ' processed')
})

// worker is ready immediately
self.postMessage('READY')
