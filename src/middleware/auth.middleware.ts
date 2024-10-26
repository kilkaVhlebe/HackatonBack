import type { Context, Next } from "hono"
import { isTokenValid } from "../utils/auth.js"

export const authMiddleware = async (context: Context, next: Next): Promise<void | Response> => {
    const token = context.req.header("Authorization") as string
    
    // Here filter middlewares & check token validity by isTokenValid

    await next()
}