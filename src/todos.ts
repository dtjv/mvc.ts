import cuid from 'cuid'

export type Todo = {
  id: string
  task: string
  done: boolean
}

export class Todos {
  private todos: Todo[] = []

  insert(props: Pick<Todo, 'task'> & Partial<Todo>): void {
    if (!props.task) {
      throw new Error(`No task. Todo 'task' is required. Insert failed.`)
    }

    const todo: Todo = {
      id: props.id ?? cuid(),
      task: props.task,
      done: props.done ?? false,
    }

    this.todos.push(todo)
  }

  update(props: Pick<Todo, 'id'> & Partial<Todo>): void {
    if (!props.id) {
      throw new Error(`No id. Todo 'id' is required. Update failed.`)
    }

    this.todos = this.todos.map((todo) =>
      todo.id === props.id
        ? {
            id: todo.id,
            task: props.task ?? todo.task,
            done: props.done ?? todo.done,
          }
        : todo
    )
  }

  remove(todoId: string): void {
    if (!todoId) {
      throw new Error(`No id. Todo 'id' is required. Remove failed.`)
    }

    this.todos = this.todos.filter((todo) => todo.id !== todoId)
  }

  toJSON() {
    return this.todos
  }
}
