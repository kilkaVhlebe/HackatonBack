import type { Context } from "hono";
import { getSeats, getSeat } from "../api/api.service.js";

export default class SeatService {

    async getSeats(context: Context) {
        const wagonId = + context.req.query().wagonId
        if (!wagonId) {
            return context.newResponse(null, 400)
        }

        const seats = await getSeats(wagonId)
        return context.json(seats, 200)
    }

    async getSeat(context: Context) {
        const seatId = + context.req.param('id')

        const seats = await getSeat(seatId)
        return context.json(seats, 200)
    }
}