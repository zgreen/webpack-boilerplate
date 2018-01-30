/* globals expect test */
import { greet, greeting, helloWorld } from './app'

test('It returns "Hello, World."', () => {
  expect(helloWorld()).toBe('Hello, World.')
})

test('A greeting is rendering in the DOM.', () => {
  const app = document.createElement('div')
  app.id = 'app'
  document.body.appendChild(app)
  greeting()
  expect(app.innerHTML).toBe(`<h1>${helloWorld()}</h1>`)
})

test('Greet renders properly.', () => {
  expect(greet()).toMatchSnapshot()
})
