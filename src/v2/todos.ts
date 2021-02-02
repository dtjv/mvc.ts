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
  private _task: string
  private _done: boolean

  constructor(props: Pick<TodoProps, 'task'> & Partial<TodoProps>) {
    super()

    if (!props.task) {
      throw new Error(`No task value. 'task' is required. Constructor failed.`)
    }

    this.id = props.id ?? cuid()
    this._task = props.task
    this._done = props.done ?? false
  }

  public get task(): string {
    return this._task
  }

  public get done(): boolean {
    return this._done
  }

  public toggle() {
    this._done = !this._done
    this.emit(TodoEvents.CHANGE)
  }

  public update(task: string) {
    if (!task) {
      throw new Error(`No task value. 'task' is required. Update failed.`)
    }

    if (this._task !== task) {
      this._task = task
      this.emit(TodoEvents.CHANGE)
    }
  }

  public toJSON() {
    return { id: this.id, task: this._task, done: this._done }
  }
}

export class Todos extends Emitter {
  private _todos: Todo[] = []

  public get todos(): Todo[] {
    return this._todos.slice(0)
  }

  public size(): number {
    return this._todos.length
  }

  public insert(todo: Todo): void {
    todo.addListener(TodoEvents.CHANGE, this._onChange.bind(this))
    this._todos.push(todo)
    this._onChange()
  }

  public remove(todoId: string): void {
    if (!todoId) {
      throw new Error(`No id value. 'id' is required. Remove failed.`)
    }

    this._todos = this._todos.filter((todo) => todo.id !== todoId)
    this._onChange()
  }

  public toJSON() {
    return this._todos.map((todo) => todo.toJSON())
  }

  private _onChange() {
    this.emit(TodoEvents.CHANGE)
  }
}
