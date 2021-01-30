import { Todo } from './types'

export class Todos {
  private readonly todos: Todo[] = []

  insert(todo: Todo) {
    this.todos.push(todo)
  }

  toJSON() {
    return this.todos
  }
}
