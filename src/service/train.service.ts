import type { Context } from "hono"
import { getSeats, getTrain, getTrains, type Train } from "../api/api.service.js"

export default class TrainService {

    async getTrains(context: Context) {
        const request = context.req.query()
        if (!request.startPoint || !request.endPoint) {
            return context.newResponse(null, 400)
        }

        const trains = await getTrains(true, request.startPoint, request.endPoint, request.stopPoint ?? "")
        return context.json(await filter(trains, request.wagonType, + request.availableSeatsCount, request.startPointDeparture), 200)
    }

    async getTrain(context: Context) {
        const trainId = + context.req.param('id')

        const train = await getTrain(trainId)
        return context.json(train, 200)
    }
}

const filter = async (trains:Train[], wagon_type: string, availableSeatsCount: number, startPointDeparture: string) => {
    let availableTrains = []

    for (const train of trains) {
        if (availableSeatsCount <= train.available_seats_count && startPointDeparture === train.startpoint_departure.split(' ')[0]) {
            for (const wagon of train.wagons_info) {
                if (wagon.type === wagon_type) {
                    const seats = await getSeats(wagon.wagon_id);
                    if (!seats) continue;
                    let freeSeats = 0;
                    for (const seat of seats) {
                        if (seat.bookingStatus === "FREE") {
                            freeSeats++;
                        }
                    }
                    if (freeSeats >= availableSeatsCount) {
                        availableTrains.push(train);
                    }
                }
            }
        }
    }
    return availableTrains
}