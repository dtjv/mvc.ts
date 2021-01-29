enum Status {
  NO,
  YES,
}

interface Todo {
  task: string
  done: boolean
  status: Status
}

const todo: Todo = { task: 'Goodbye World', done: false, status: Status.NO }

console.log(todo)
