import { Todo } from './types'

export class View {
  render(todos: Todo[]): void {
    todos.forEach((todo) => {
      console.log(todo)
    })
  }
}
