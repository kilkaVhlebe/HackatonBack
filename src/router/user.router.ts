import { Hono } from "hono";
import UserService from './../service/user.service.js'

const userService = new UserService()
export const user = new Hono().basePath('/user')

user.post('/register', userService.register)
user.post('/login', userService.login)

