import { App } from './app'
import { View } from './view'
import { Todos } from './todos'
import { Store } from './store'

const view = new View(window.document, 'app')
const todos = new Todos()
const store = new Store('todos', localStorage)
const app = new App(todos, view, store)

app.start()
