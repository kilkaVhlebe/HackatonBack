import { serve } from '@hono/node-server'
import { Hono, type Env, type Next } from 'hono'
import { user}  from './router/user.router.js'
import { cors } from 'hono/cors'
import "dotenv/config"


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', user)
app.use('/*', cors())
app.use(
  '/*',
  cors({
    origin: '*',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'],
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision']
  })
);



const port = Number(process.env.PORT)
if(!port) throw new Error("ENV PARSING ERROR")


console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
