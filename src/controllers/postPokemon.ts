import {BadRequest, Ok, HTTPResponse} from '../types/HTTPResponse.ts'
import {getDatabase} from '../utils/dbConnection.ts'
import Pokemon from '../types/Pokemon.ts'

export default async ({request, response}: {request: any, response: any}) => {
  try {
    if(!request.hasBody) {
      throw BadRequest('Invalid body')
    }
    const {value} = request.body({type: 'json'})
    const body: Pokemon = await value

    if(!body.name || !body.category || !body.weight || !body.height){
      throw BadRequest('Invalid body once again')
    }

    const db = getDatabase()
    await db.query('INSERT INTO pokemons(name,category,height,weight) VALUES(?,?,?,?)', body.name, body.category, body.height, body.weight)
    const pokemonID = db.getInsertedRowID()
    const rows = db.query('SELECT id,name,category,height,weight FROM pokemons WHERE id=?', pokemonID)

    const row = rows.next()
    const pokemon = {
      id: row.value[0],
      name: row.value[1],
      category: row.value[2],
      height: row.value[3],
      weight: row.value[4],
    }
    rows.return()

    response.body = Ok(pokemon)
    response.status = 200
    response.headers.set('Location',`/api/v1/pokemons/${pokemon.id}`) 
    response.headers.set('Content-Type', 'application/json')
  }catch(e){
    response.body = e instanceof HTTPResponse ? e : BadRequest(e.message)
    response.status = e instanceof HTTPResponse ? e.status :BadRequest(e.message).status
  }
}