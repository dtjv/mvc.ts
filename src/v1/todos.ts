import cuid from 'cuid'

export type Todo = {
  id: string
  task: string
  done: boolean
}

export class Todos {
  private _todos: Todo[] = []

  public insert(props: Pick<Todo, 'task'> & Partial<Todo>): void {
    if (!props.task) {
      throw new Error(`No task. Todo 'task' is required. Insert failed.`)
    }

    const todo: Todo = {
      id: props.id ?? cuid(),
      task: props.task,
      done: props.done ?? false,
    }

    this._todos.push(todo)
  }

  public update(props: Pick<Todo, 'id'> & Partial<Todo>): void {
    if (!props.id) {
      throw new Error(`No id. Todo 'id' is required. Update failed.`)
    }

    this._todos = this._todos.map((todo) =>
      todo.id === props.id
        ? {
            id: todo.id,
            task: props.task ?? todo.task,
            done: props.done ?? todo.done,
          }
        : todo
    )
  }

  public remove(todoId: string): void {
    if (!todoId) {
      throw new Error(`No id. Todo 'id' is required. Remove failed.`)
    }

    this._todos = this._todos.filter((todo) => todo.id !== todoId)
  }

  public toJSON() {
    return this._todos
  }
}
