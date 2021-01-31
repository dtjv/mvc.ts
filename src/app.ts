import { Todo } from './types'
import { Todos } from './todos'
import { View, ViewEvents } from './view'
import { Store } from './store'

export class App {
  constructor(
    private readonly todos: Todos,
    private readonly view: View,
    private readonly store: Store
  ) {
    this.load()

    this.view.registerHandler({
      event: ViewEvents.CREATE_TODO,
      handler: this.handleCreateTodo.bind(this),
    })

    this.view.registerHandler({
      event: ViewEvents.UPDATE_TODO,
      handler: this.handleUpdateTodo.bind(this),
    })

    this.view.registerHandler({
      event: ViewEvents.REMOVE_TODO,
      handler: this.handleRemoveTodo.bind(this),
    })
  }

  load() {
    this.store.get().forEach((todo) => {
      this.todos.insert(todo as Todo)
    })
  }

  save() {
    this.store.set(this.todos.toJSON())
  }

  show() {
    this.view.render(this.todos.toJSON())
  }

  handleCreateTodo(props: Partial<Todo>): void {
    if (props.task) {
      this.todos.insert({ task: props.task })
      this.save()
      this.show()
    }
  }

  handleUpdateTodo(props: Partial<Todo>): void {
    if (props.id) {
      this.todos.update({ ...props, id: props.id })
      this.save()
      this.show()
    }
  }

  handleRemoveTodo(props: Partial<Todo>): void {
    if (props.id) {
      this.todos.remove(props.id)
      this.save()
      this.show()
    }
  }
}
