import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './controllers/index.ts'
import {initDatabase} from './utils/dbConnection.ts'

const app = new Application()
const env = Deno.env.toObject() 
const port: number = +env.PORT || 8000 
const hostname: string = env.HOSTNAME ||'127.0.0.1' 

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen', () => {
  console.log(`the app listens on port ${hostname}:${port}`)
})

await initDatabase('data.db')
await app.listen({port})
