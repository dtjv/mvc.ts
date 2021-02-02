import { App } from './app'
import { View } from './view'
import { Todos } from './todos'
import { Store } from './store'

const store = new Store('todos2', localStorage)
const todos = new Todos()
const view = new View(window.document, '#app', todos)
const app = new App(todos, view, store)

app.show()
