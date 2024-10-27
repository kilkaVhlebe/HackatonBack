import type { Context } from "hono";
import { order } from "../api/api.service.js";
import { createBooking } from "../database.js";

export default class BookingService {

    async order(context: Context) {
        const request = await context.req.json()
        if (!request.trainId || !request.wagonId || !request.seatIds) {
            return context.newResponse(null, 400)
        }

        const book = await order(request.trainId, request.wagonId, request.seatIds)
        return context.json(book, 200)
    }

    async createBooking(context: Context) {
        const request = await context.req.json()
        //
        if(!request.user_id || !request.start_point || !request.end_point  || !request.startpoint_departure || !request.available_seats_count || !request.auto_booking) {
            return context.newResponse(null, 400)
        }
        
        const booking = await createBooking(request.user_id, request.start_point,request.end_point,request.startpoint_departure, request.available_seats_count, request.auto_booking,request.wagon_type, true)
        return context.json(booking, 200)
    }
}