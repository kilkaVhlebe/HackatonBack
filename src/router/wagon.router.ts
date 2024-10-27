import { Hono } from "hono";
import WagonService from "../service/wagon.service.js";

const wagonService = new WagonService()
export const wagon = new Hono().basePath("/wagons")

wagon.get('/', wagonService.getWagons)
wagon.get('/:id', wagonService.getWagon)