import {getDatabase} from '../utils/dbConnection.ts'
import {BadRequest, Ok, HTTPResponse, NotFound, StatusCode} from '../types/HTTPResponse.ts'
import Pokemon from '../types/Pokemon.ts'

export default ({response}: {response: any}) => {
  try {
    const db = getDatabase()
    const pokemons: Array<Pokemon> = [...db.query('SELECT id,name,category,height,weight from pokemons').asObjects()]

    if(!pokemons.length){
      throw NotFound('Pokemons not found')
    }

    response.body = Ok(pokemons)
    response.status = StatusCode.Ok
  }catch(e){
    response.body = e instanceof HTTPResponse ? e : BadRequest(e.message)
    response.status = e instanceof HTTPResponse ? e.status : BadRequest(e.message).status
  }
}