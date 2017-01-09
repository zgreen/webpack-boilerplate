const helloWorld = require('../index.js').default()
const test = require('tape')

test('Should return "Hello, World!"', (t) => {
	t.equal(helloWorld, 'Hello, World!')
	t.end()
})
