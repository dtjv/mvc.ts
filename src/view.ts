import { Todo } from './types'

export enum ViewEvents {
  CREATE_TODO = 'CREATE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
}

type Handler = (props: Partial<Todo>, event?: Event) => void

type Handlers = Record<string, Handler>

export class View {
  private handlers: Handlers = {}
  private readonly $root: HTMLElement | null
  private readonly $wrapper: HTMLElement
  private readonly $header: HTMLElement
  private readonly $title: HTMLElement
  private readonly $form: HTMLElement
  private readonly $taskTxt: HTMLInputElement
  private readonly $taskBtn: HTMLElement
  private readonly $todos: HTMLElement
  private readonly $noTodos: HTMLElement

  constructor(private readonly document: Document, rootId: string) {
    this.$root = this.document.querySelector(rootId)

    if (!this.$root) {
      throw new Error(`root id, '${rootId}', must exist in doc`)
    }

    this.$wrapper = this.createElement('div', 'wrapper')
    this.$header = this.createElement('header')
    this.$title = this.createElement('h1')
    this.$title.textContent = 'Todos'
    this.$form = this.createElement('form', 'flex justify-between')
    this.$taskTxt = this.createElement('input', 'task-txt') as HTMLInputElement
    this.$taskTxt.setAttribute('type', 'text')
    this.$taskTxt.setAttribute('placeholder', 'Enter your task')
    this.$taskBtn = this.createElement('button', 'task-btn')
    this.$taskBtn.textContent = 'Add Task'
    this.$todos = this.createElement('ul', 'space-y-4')
    this.$noTodos = this.createElement('p', 'hidden font-bold text-gray-500')
    this.$noTodos.textContent = 'No tasks for you!'

    this.$header.append(this.$title)
    this.$form.append(this.$taskTxt, this.$taskBtn)
    this.$wrapper.append(this.$header, this.$form, this.$todos, this.$noTodos)
    this.$root.append(this.$wrapper)

    this.$taskBtn.addEventListener('click', this.createTodo.bind(this))
  }

  registerHandler({
    event,
    handler,
  }: {
    event: ViewEvents
    handler: Handler
  }): void {
    this.handlers[event] = handler
  }

  createTodo(): void {
    this.handlers[ViewEvents.CREATE_TODO]?.({ task: this.$taskTxt.value })
    this.$taskTxt.value = ''
  }

  createElement(tag: string, classList?: string) {
    const $element = this.document.createElement(tag)

    if (classList) {
      $element.classList.add(...classList.split(' '))
    }

    return $element
  }

  createItem(todo: Todo): HTMLElement {
    const $li = this.createElement('li', 'todo')
    $li.setAttribute('id', todo.id)

    const $todoChk = this.createElement('input', 'todo-chk')
    $todoChk.setAttribute('type', 'checkbox')
    if (todo.done) {
      $todoChk.setAttribute('checked', '')
    }

    const $todoTxt = this.createElement('span', 'todo-txt')
    $todoTxt.setAttribute('contentEditable', '')

    const textNode = this.document.createTextNode(todo.task)
    if (todo.done) {
      const $s = this.createElement('s')
      $s.append(textNode)
      $todoTxt.append($s)
    } else {
      $todoTxt.append(textNode)
    }

    const $todoBtn = this.createElement('button', 'todo-btn')
    $todoBtn.textContent = 'Delete'

    $li.append($todoChk, $todoTxt, $todoBtn)

    return $li
  }

  render(todos: Todo[]): void {
    while (this.$todos.firstChild) {
      this.$todos.firstChild.remove()
    }

    if (todos.length === 0) {
      this.$noTodos.classList.remove('hidden')
    } else {
      this.$noTodos.classList.add('hidden')
      this.$todos.append(...todos.map((todo) => this.createItem(todo)))
    }
  }
}
