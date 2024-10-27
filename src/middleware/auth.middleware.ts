import type { Context, Next } from "hono"
import { isTokenValid } from "../utils/auth.js"

const whitelisted = [
    '/user/register',
    '/user/login'
]

export const authMiddleware = async (context: Context, next: Next): Promise<Response | void> => {
    if (whitelisted.some((endpoint) => context.req.url.endsWith(endpoint))) {
        return await next()
    }

    const token = context.req.header("Authorization") as string

    if (!await isTokenValid(token)) {
        return context.newResponse(null, 401)
    }

    return await next()
}