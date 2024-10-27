import { Hono } from 'hono';
import SeatService from '../service/seat.service.js';

const seatService = new SeatService()
export const seats = new Hono().basePath('/seats')

seats.get('/', seatService.getSeats)
seats.get('/:id', seatService.getSeat)