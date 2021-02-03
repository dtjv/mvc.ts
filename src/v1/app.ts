import { Todo, Todos } from './todos'
import { View, ViewEvents } from './view'
import { Store } from './store'

export class App {
  constructor(
    private readonly _todos: Todos,
    private readonly _view: View,
    private readonly _store: Store
  ) {
    this._load()

    this._view.registerHandler({
      event: ViewEvents.CREATE_TODO,
      handler: this._handleCreateTodo.bind(this),
    })

    this._view.registerHandler({
      event: ViewEvents.UPDATE_TODO,
      handler: this._handleUpdateTodo.bind(this),
    })

    this._view.registerHandler({
      event: ViewEvents.REMOVE_TODO,
      handler: this._handleRemoveTodo.bind(this),
    })
  }

  public show() {
    this._view.render(this._todos.toJSON())
  }

  private _load() {
    this._store.get().forEach((todo) => {
      this._todos.insert(todo as Todo)
    })
  }

  private _save() {
    this._store.set(this._todos.toJSON())
  }

  private _handleCreateTodo(props: Partial<Todo>): void {
    if (props.task) {
      this._todos.insert({ task: props.task })
      this._save()
      this.show()
    }
  }

  private _handleUpdateTodo(props: Partial<Todo>): void {
    if (props.id) {
      this._todos.update({ ...props, id: props.id })
      this._save()
      this.show()
    }
  }

  private _handleRemoveTodo(props: Partial<Todo>): void {
    if (props.id) {
      this._todos.remove(props.id)
      this._save()
      this.show()
    }
  }
}
