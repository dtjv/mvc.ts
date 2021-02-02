import { Todo, Todos, TodoEvents } from './todos'
import { View } from './view'
import { Store } from './store'

export class App {
  constructor(
    private readonly _todos: Todos,
    private readonly _view: View,
    private readonly _store: Store
  ) {
    this.load()
    this._todos.addListener(TodoEvents.CHANGE, this._onChange.bind(this))
  }

  public load() {
    this._store.get().forEach((todo) => {
      this._todos.insert(new Todo(todo as Todo))
    })
  }

  public show() {
    this._view.render()
  }

  private _save() {
    this._store.set(this._todos.toJSON())
  }

  private _onChange() {
    this._save()
    this.show()
  }
}
