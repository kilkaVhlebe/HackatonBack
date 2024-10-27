import type { Context } from "hono";
import { getWagons, getWagon } from "../api/api.service.js";

export default class WagonService {

    async getWagons(context: Context) {
        const trainId = + context.req.query().trainId
        if (!trainId) {
            return context.newResponse(null, 400)
        }

        const wagons = await getWagons(trainId)
        return context.json(wagons, 200)
    }

    async getWagon(context: Context) {
        const wagonId = + context.req.param('id')

        const wagon = await getWagon(wagonId)
        return context.json(wagon, 200)
    }
}