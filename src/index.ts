import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"

import { authMiddleware } from './middleware/auth.middleware.js'
import { corsMiddleware } from './middleware/cors.middleware.js'

import { user}  from './router/user.router.js'
import { booking } from './router/booking.router.js'
import { train } from './router/train.router.js'
import { wagon } from './router/wagon.router.js'
import { seats } from './router/seat.router.js'
import { bookingCheck } from './api/api.service.js'

const requiredEnvVars = [ 
  'PORT',                 
  'DATABASE_URL', 
  'API_EMAIL', 
  'API_PASSWORD', 
  'API_TOKEN', 
  'JWT_SECRET', 
]
requiredEnvVars.forEach(varName => { 
  if (!process.env[varName]) { 
    throw new Error(`Environment ${varName} required.`) 
  } 
})



const app = new Hono()


app.use(authMiddleware)
app.use(corsMiddleware)

app.route('/', user)
app.route('/', train)
app.route('/', wagon)
app.route('/', seats)
app.route('/', booking)
  
let isRunning = false;
setInterval(async () => {
  if (isRunning) return;
  isRunning = true;

  await bookingCheck();
  isRunning = false;
}, 1000);


const port = Number(process.env.PORT)
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
