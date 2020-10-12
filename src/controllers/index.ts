import { Router } from "https://deno.land/x/oak/mod.ts";
import ping from './ping.ts'
import getPokemon from './getPokemon.ts'
import getPokemons from './getPokemons.ts'
import deletePokemon from './deletePokemon.ts'
import postPokemon from './postPokemon.ts'
import putPokemon from './putPokemon.ts'

const router = new Router()

router.get('/ping', ping)
router.get('/api/v1/pokemons/:id', getPokemon)
router.get('/api/v1/pokemons', getPokemons)
router.post('/api/v1/pokemons', postPokemon)
router.delete('/api/v1/pokemons/:id', deletePokemon)
router.put('/api/v1/pokemons/:id', putPokemon)

export default router