import {getDatabase} from '../utils/dbConnection.ts'
import {BadRequest, Ok, HTTPResponse, StatusCode} from '../types/HTTPResponse.ts'
import Pokemon from '../types/Pokemon.ts'
import rowToPokemon from '../utils/rowToPokemon.ts'

export default ({response}: {response: any}) => {
  try {
    const db = getDatabase()
    const rows = db.query('SELECT id,name,category,height,weight from pokemons')

    const pokemons: Array<Pokemon> = []
    for(const row of rows){
      const pokemon: Pokemon = rowToPokemon(row)
      pokemons.push(pokemon)
    }

    response.body = Ok(pokemons)
    response.status = StatusCode.Ok
  }catch(e){
    response.body = e instanceof HTTPResponse ? e : BadRequest(e.message)
    response.status = e instanceof HTTPResponse ? e.status : BadRequest(e.message).status
  }
}