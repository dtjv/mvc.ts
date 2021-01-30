import cuid from 'cuid'

import { Todo } from './types'
import { App } from './app'
import { View } from './view'
import { Todos } from './todos'
import { Store } from './store'

const view = new View()
const todos = new Todos()
const store = new Store('todos', localStorage)
const app = new App(todos, view, store)

const data: Todo[] = [
  {
    id: cuid(),
    task: 'go for a run',
    done: false,
  },
  {
    id: cuid(),
    task: 'buy bread',
    done: false,
  },
  {
    id: cuid(),
    task: 'lift weights',
    done: true,
  },
]

store.set(data)

app.start()
