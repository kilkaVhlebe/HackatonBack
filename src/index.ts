import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { user}  from './router/user.router.js'
import "dotenv/config"
import { authMiddleware } from './middleware/auth.middleware.js'
import { cors } from 'hono/cors'
import { book } from './router/booking.router.js'
import ApiService from './api/api.service.js'


const app = new Hono()
const apiService = new ApiService()

app.use(authMiddleware)

let isRunning = false;
setInterval(async () => {
  if (isRunning) return;
  isRunning = true;

  await apiService.bookingCheck();
  isRunning = false;
}, 1000);


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
app.route('/', book)

const port = Number(process.env.PORT)
if(!port) throw new Error("ENV PARSING ERROR")

  
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
