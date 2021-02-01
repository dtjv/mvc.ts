import cuid from 'cuid'

import { Emitter } from './emitter'

export enum TodoEvents {
  CHANGE = 'CHANGE',
}

type TodoProps = {
  id: string
  task: string
  done: boolean
}

export class Todo extends Emitter {
  public readonly id: string
  public task: string
  public done: boolean

  constructor(props: Pick<TodoProps, 'task'> & Partial<TodoProps>) {
    super()

    if (!props.task) {
      throw new Error(`No task value. 'task' is required. Constructor failed.`)
    }

    this.id = props.id ?? cuid()
    this.task = props.task
    this.done = props.done ?? false
  }

  public toggle() {
    this.done = !this.done
    this.emit(TodoEvents.CHANGE)
  }

  public update(task: string) {
    if (!task) {
      throw new Error(`No task value. 'task' is required. Update failed.`)
    }

    if (this.task !== task) {
      this.task = task
      this.emit(TodoEvents.CHANGE)
    }
  }

  public toJSON() {
    return { id: this.id, task: this.task, done: this.done }
  }
}

export class Todos extends Emitter {
  private todos: Todo[] = []

  public insert(todo: Todo): void {
    todo.addListener(TodoEvents.CHANGE, this.onChange.bind(this))
    this.todos.push(todo)
  }

  public remove(todoId: string): void {
    if (!todoId) {
      throw new Error(`No id value. 'id' is required. Remove failed.`)
    }

    this.todos = this.todos.filter((todo) => todo.id !== todoId)
  }

  public toJSON() {
    return this.todos.map((todo) => todo.toJSON())
  }

  private onChange() {
    this.emit(TodoEvents.CHANGE)
  }
}
