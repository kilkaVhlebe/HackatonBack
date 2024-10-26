import type { Context } from "hono";
import { createUser, getUserByLogin } from "../database.js";
import { compare, genSalt, hash } from "bcrypt-ts";




export default class UserService {

async userRegistration(context:  Context) {
try {
    const  request = await context.req.json()
    if(!request.fullName || !request.login || !request.password ) {
        return context.body("Registration failed", 400)
    }
    const user = await getUserByLogin(request.login)
    if(!user) return context.body("login is null", 404)
    if(user.login=== request.login){
        return context.body("Login alredy exists", 409)
    }
    await genSalt(10)
        .then((salt) => hash(request.password, salt))
        .then((hash) => {
            request.password = hash
        });
    await createUser(request)
    return context.body("User registered", 200)
} catch(error) {
    console.error(error);
    return context.body("Internal server error", 500)
    
}



}

async userLogin(context: Context) {
    try {    
        const request = await context.req.json()
        if(!request.login || !request.password) {
            return context.body("Login failed", 400)
        }
        const user = await getUserByLogin(request.login)
        if(!user) return context.body("Wrong login", 401)
        return await compare(request.password, user.password).then((result) => 
            result === true ? context.body("Login succesfull", 200) : context.body("Wrong password", 401)
        )
    } catch(error) {
        console.error(error);
        return context.body("Internal server error", 500)
    }
}

}