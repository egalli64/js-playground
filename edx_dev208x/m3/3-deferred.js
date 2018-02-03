// Sample worker script

// Send ready message (again - sample implementation)
self.postMessage('READY')

// Sleep for two seconds
// Simulate my long running operation
sleep(2000)

// Send completed message
self.postMessage('COMPLETED')

function sleep(miliseconds) {
	let startingTime = new Date().getTime()
	let stopTime = startingTime + miliseconds

	while (stopTime >= new Date().getTime()) { }
}