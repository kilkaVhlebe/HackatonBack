import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { user}  from './router/user.router.js'
import "dotenv/config"

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', user)

const port = Number(process.env.PORT)
if(!port) throw new Error("ENV PARSING ERROR")

  
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
