import {getDatabase} from '../utils/dbConnection.ts'
import { HTTPResponse, BadRequest, NotFound, Ok, StatusCode } from '../types/HTTPResponse.ts'
import rowToPokemon from '../utils/rowToPokemon.ts'

export default ({params,response}: {params: any, response: any}) => {
  try {
    const {id} = params
    if(!id){
      throw BadRequest('Invalid request parameters')
    }

    const db = getDatabase()
    const rows = db.query('SELECT id,name,category,height,weight from pokemons WHERE id=?', id)
    const row = rows.next()
    rows.return()

    if(!row.value){
      throw NotFound('Pokemon not found')
    }

    const pokemon = rowToPokemon(row.value)

    response.body = Ok(pokemon)
    response.status = StatusCode.Ok
  }catch(e){
    const r = e instanceof HTTPResponse ? e : BadRequest(e.message)

    response.body = r
    response.status = r.status
  }
}