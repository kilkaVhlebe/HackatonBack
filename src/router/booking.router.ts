import { Hono } from "hono";
import BookingService from './../service/booking.service.js'

const bookingService = new BookingService()
export const  booking  = new Hono().basePath('/booking')

booking.post('/', (context) => bookingService.createBooking(context))
booking.post('/order',(context) => bookingService.order(context))
