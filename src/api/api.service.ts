import axios from "axios";
import {updateApiToken} from './api.connection.js'
import { error } from "console";


export default class ApiService {

async getWagons(traindId: number) {
   await axios.get(`/api/info/wagons?trainId=${traindId}`,{
    headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
   })
    .then(async (response) => {
        if(response.status===403) {
            await updateApiToken()
            this.getWagons(traindId)
        } 
        return response.data
    })
    .catch((error)=>{
        throw new Error(error)
    })
}

async getWagon(wagonId: number) {
    await axios.get(`/api/info/wagons/${wagonId}`,{
     headers: {
         Authorization: `Bearer ${process.env.API_TOKEN}`
     }
    })
     .then(async (response) => {
         if(response.status===403) {
             await updateApiToken()
             this.getWagon(wagonId)
         } 
         return response.data
     })
     .catch((error)=>{
         throw new Error(error)
     })
 }

 async getTrains(params:{booking_available?: boolean, start_point: string, end_point: string, stop_points: string}) {
    await axios.get(`/api/info/trains`,{
     headers: {
         Authorization: `Bearer ${process.env.API_TOKEN}`
     }
    })
     .then(async (response) => {
         if(response.status===403) {
             await updateApiToken()
             this.getTrains(params)
         } 
         return response.data
     })
     .catch((error)=>{
         throw new Error(error)
     })
}

async getTrain(trainId: number) {
    await axios.get(`/api/info/train/${trainId}`,{
     headers: {
         Authorization: `Bearer ${process.env.API_TOKEN}`
     }
    })
     .then(async (response) => {
         if(response.status===403) {
             await updateApiToken()
             this.getTrain(trainId)
         } 
         return response.data
     })
     .catch((error)=>{
         throw new Error(error)
     })
}

async getSeats(wagonId: number) {
    await axios.get(`/api/info/seats?${wagonId}`,{
     headers: {
         Authorization: `Bearer ${process.env.API_TOKEN}`
     }
    })
     .then(async (response) => {
         if(response.status===403) {
             await updateApiToken()
             this.getSeats(wagonId)
         } 
         return response.data
     })
     .catch((error)=>{
         throw new Error(error)
     })
}

async getSeat(seatId: number) {
    await axios.get(`/api/info/seats/${seatId}`,{
     headers: {
         Authorization: `Bearer ${process.env.API_TOKEN}`
     }
    })
     .then(async (response) => {
         if(response.status===403) {
             await updateApiToken()
             this.getSeats(seatId)
         } 
         return response.data
     })
     .catch((error)=>{
         throw new Error(error)
     })
}

async createOrder(props: {trainId: number, wagonId: number, seatsId: number[]}) {
    const maxAttempts = 5; 
    const attemptDelay = 72000; 
    let attempts = 0;

    while (attempts < maxAttempts) {

    await axios.post(`/api/order`,{
        train_id: props.trainId,
        wagon_id: props.wagonId,
        seat_ids: props.seatsId
    },
{
    headers:{
        Authorization: `Bearer ${process.env.API_TOKEN}`
    }
    })
    .then(async (response) => {
    if(response.status===403) {
        await updateApiToken()
        this.createOrder(props)
    } 
    return response.data
    })
    .catch((error)=>{
    throw new Error(error)
    })
    }
attempts++;
await new Promise(resolve => setTimeout(resolve, attemptDelay));
}
}