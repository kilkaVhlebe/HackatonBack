import type { Context } from "hono";
import ApiService from '../api/api.service.js'

const apiService = new ApiService()


export default class BookingService {

    async getSeats(context: Context) {
        try {
            const request = await context.req.json()
            const trains = await apiService.getTrains(true, request.start_point, request.end_point)
            trains.map(()=> {

            })
        } catch (error) {
            console.error(error);
            return context.body('Intrernal server error', 500)
        }
    }

}