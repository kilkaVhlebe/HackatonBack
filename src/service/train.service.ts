import type { Context } from "hono"
import { getTrain, getTrains } from "../api/api.service.js"

export default class TrainService {

    async getTrains(context: Context) {
        const request = context.req.query()
        if (!request.startPoint || !request.endPoint) {
            return context.newResponse(null, 400)
        }

        const trains = await getTrains(true, request.startPoint, request.endPoint, request.stopPoint ?? "")
        return context.json(trains, 200)
    }

    async getTrain(context: Context) {
        const trainId = + context.req.param('id')

        const train = await getTrain(trainId)
        return context.json(train, 200)
    }
}