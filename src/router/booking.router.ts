import { Hono } from "hono";
import BookingService from './../service/booking.service.js'

const bookingService = new BookingService()
export const  book  = new Hono().basePath('/book')

book.post('/trains', (context) => bookingService.getTrains(context))
book.post('/seats', (context) => bookingService.getSeats(context))
book.post('/create/order', (context) => bookingService.createBook(context))
book.post('create/query',(context) => bookingService.createBokingQuery(context))
