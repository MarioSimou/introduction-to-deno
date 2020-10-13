import { DB } from "https://deno.land/x/sqlite/mod.ts";

export interface SqliteOptions {
  path: string
}

class SqliteDB {
  private _connection: any
  private _path: string

  constructor(options: SqliteOptions){
    if(!options.path){
      throw new Error('Unable to determine database path')
    }

    this._path = options.path
    this._connection = new DB(options.path)
  }

  public query(sql: string, ...args: Array<any>){
    return this._connection.query(sql, args)
  }
  public close(){
    return this._connection.close()
  }
  public getInsertedRowID(){
    return this._connection.lastInsertRowId
  }
  get path(): string {
    return this._path
  }
  get connection(): any {
    return this._connection
  }
}

export default SqliteDB

