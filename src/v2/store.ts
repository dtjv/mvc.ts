export class Store {
  constructor(private readonly _key: string, private readonly _db: Storage) {}

  public get(): unknown[] {
    return JSON.parse(this._db.getItem(this._key) ?? '[]')
  }

  public set(data: unknown[]): void {
    this._db.setItem(this._key, JSON.stringify(data))
  }
}
