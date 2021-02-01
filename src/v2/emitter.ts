export type Listener = () => void

export class Emitter {
  private readonly listeners: Map<string, Listener[]> = new Map()

  addListener(event: string, listener: Listener): void {
    const listeners = this.listeners.get(event) ?? []
    listeners.push(listener)
    this.listeners.set(event, listeners)
  }

  emit(event: string): void {
    const listeners = this.listeners.get(event) ?? []
    listeners.forEach((listener) => {
      listener()
    })
  }
}
