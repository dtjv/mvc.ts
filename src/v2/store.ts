export class Store {
  constructor(private readonly key: string, private readonly db: Storage) {}

  get(): unknown[] {
    return JSON.parse(this.db.getItem(this.key) ?? '[]')
  }

  set(data: unknown[]): void {
    this.db.setItem(this.key, JSON.stringify(data))
  }
}
