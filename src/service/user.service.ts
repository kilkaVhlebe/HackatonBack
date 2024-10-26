import type { Context } from "hono";
import { createUser, getUserByLogin } from "../database.js";
import { compare, genSalt, hash } from "bcrypt-ts";
import { createJwt } from "../utils/auth.js";

export default class UserService {

    async userRegistration(context:  Context) {
        const request = await context.req.json()
        if(!request.fullName || !request.login || !request.password ) {
            return context.json({},400)
        }

        if(await getUserByLogin(request.login)) {
            return context.json({},409)
        }

        await genSalt(10)
            .then((salt) => hash(request.password, salt))
            .then((hash) => {
                request.password = hash
            });
        
        const user = await createUser(request)
        return context.json({ token: await createJwt(user.id) }, 200)
    }

    async userLogin(context: Context) {  
        const request = await context.req.json()
        if(!request.login || !request.password) {
            return context.json({},400)
        }

        const user = await getUserByLogin(request.login)
        if(!user) {
            return context.json({},401)
        }

        return await compare(request.password, user.password).then(async (result) => 
            result === true ? context.json({token: await createJwt(user.id)}, 200) 
                            : context.json({}, 401)
        )
    }

}