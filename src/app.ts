import { Todo } from './types'
import { Todos } from './todos'
import { View } from './view'
import { Store } from './store'

export class App {
  constructor(
    private readonly todos: Todos,
    private readonly view: View,
    private readonly store: Store
  ) {
    this.load()
  }

  load() {
    this.store.get().forEach((todo) => {
      this.todos.insert(todo as Todo)
    })
  }

  save() {
    this.store.set(this.todos.toJSON())
  }

  start() {
    this.view.render(this.todos.toJSON())
  }
}
