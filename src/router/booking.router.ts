import { Hono } from "hono";
import BookingService from './../service/booking.service.js'

const bookingService = new BookingService()
export const  book  = new Hono().basePath('/book')

book.post('/tickets', (context) => bookingService.getSeats(context))

