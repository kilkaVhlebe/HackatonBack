import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { user}  from './router/user.router.js'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', user)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
