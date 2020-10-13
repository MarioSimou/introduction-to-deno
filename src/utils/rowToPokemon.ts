import Pokemon from '../types/Pokemon.ts'

const rowToPokemon = ([id,name,category,height,weight]: any): Pokemon => ({
  id,
  name,
  category,
  height,
  weight
})

export default rowToPokemon