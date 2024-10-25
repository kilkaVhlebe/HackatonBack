import { Hono } from "hono";
import UserService from './../service/user.service.js'
const userService = new UserService()

export const user = new Hono().basePath('/user')

user.post('/register', (context) => userService.userRegistration(context))
user.post('/login', (context) => userService.userLogin(context))
