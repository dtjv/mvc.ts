export type Listener = () => void

export abstract class Emitter {
  private readonly _listeners: Map<string, Listener[]> = new Map()

  public addListener(event: string, listener: Listener): void {
    const listeners = this._listeners.get(event) ?? []
    listeners.push(listener)
    this._listeners.set(event, listeners)
  }

  public emit(event: string): void {
    const listeners = this._listeners.get(event) ?? []
    listeners.forEach((listener) => {
      listener()
    })
  }
}
