import { Hono } from 'hono';
import TrainService from '../service/train.service.js';

const trainService = new TrainService()
export const train = new Hono().basePath('/trains')

train.get('/', trainService.getTrains)
train.get('/:id', trainService.getTrain)