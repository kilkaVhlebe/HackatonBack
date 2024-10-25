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

}

const api = new ApiService()

api.getWagons(1)