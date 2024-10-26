import type { Context } from "hono";
import ApiService from '../api/api.service.js'
import { createBooking } from "../database.js";

const apiService = new ApiService()


export default class BookingService {

    async getTrains(context: Context) {
        try {
            const request = await context.req.json()
            const trains = await apiService.getTrains(true, request.start_point, request.end_point)
            
            const filter = () => {        
                let availabletrains: { train_id: number; global_route: string; startpoint_departure: string; endpoint_arrival: string; detailed_route: { name: string; num: number; arrival: string; departure: string; }[]; wagons_info: { wagon_id: number; type: "LOCAL" | "PLATZCART" | "COUPE" | "SV" | "LUX"; seats?: { seat_id: number; seatNum: string; block: string; price: number; bookingStatus: "CLOSED" | "FREE" | "BOOKED"; }[]; }[]; available_seats_count: number; }[] = [];    
                trains.forEach((json) => {
                    if(request.available_seats_count <= json.available_seats_count && request.startpoint_departure === json.startpoint_departure.split(' ')[0]) {
                        json.wagons_info.forEach((wagon) => {
                            if(wagon.type == request.wagon_type) {
                                return availabletrains.push(json)
                            }
                        })
                    }   
                })
                return availabletrains
            }
            return context.json(filter(), 200)
    
            } catch (error) {
            console.error(error);
            return context.body('Intrernal server error', 500)
        }
    }

    async getSeats(context: Context)  {
        try {
            const request = await context.req.json()
            if(!request.wagon_id) {
                context.body('Bad data', 400)
            }
            const seats = await apiService.getSeats(request.wagon_id)
            return context.json(seats, 200)
        } catch (error) {
            console.error(error);
            return context.body('Intrernal server error', 500)
        }
    }

    async createBook (context: Context) {
        try {
            const request = await context.req.json()
            if (!request.train_id || !request.wagon_id || !request.seat_ids) {
            context.body('Bad data', 400)
            }
            const book = await apiService.order(request.train_id, request.wagon_id, request.seat_ids)
            return context.json({book}, 200)
        }    catch (error) {
            console.error(error);
            return context.body('Intrernal server error', 500)
        }
        
    }

    async createBokingQuery (context: Context) {
        try {
            const request = await context.req.json()
            if(!request.user_id || !request.start_point || !request.end_point || !request.available_seats_count || !request.auto_booking) {
                context.body('Bad data', 400)
            }
            const query = await createBooking(request.user_id, request.start_point,request.end_point,request.startpoint_departure, request.available_seats_count, request.auto_booking,request.wagon_type, true)
            return context.json(query, 200)
        } catch (error) {
            console.error(error);
            return context.body('Intrernal server error', 500)
        }
    }

}