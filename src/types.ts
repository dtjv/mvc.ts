export type Todo = {
  id: string
  task: string
  done: boolean
}

export type TodoUpdate = Pick<Todo, 'id'> & Partial<Todo>

export type Query = Partial<Todo> & { count?: number; startIdx?: number }
