function greet () {
  return `<h1>${helloWorld()}</h1>`
}

function greeting () {
  document.getElementById('app').innerHTML = `<h1>${helloWorld()}</h1>`
}

function helloWorld () {
  return 'Hello, World.'
}

if (module.hot) {
  module.hot.accept()
}

export { greet, greeting, helloWorld }
