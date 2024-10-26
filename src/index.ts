import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { user}  from './router/user.router.js'
import "dotenv/config"
import { authMiddleware } from './middleware/auth.middleware.js'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(authMiddleware)

app.use(
  cors({
    origin: (origin, c) => origin,
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type' ],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

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
