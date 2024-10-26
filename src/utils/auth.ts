import { sign, verify } from "hono/jwt"
import { createToken, deleteToken, getToken } from "../database.js"

export const createJwt = async (userId: number): Promise<string> => {
    const sessionId = (await createToken(userId)).id
    return await sign({userId, sessionId, exp: Math.floor(Date.now() / 1000) + 86400}, process.env.JWT_SECRET as string)
}

export const isTokenValid = async (token: string): Promise<Boolean> => {
    let decodedToken
    try {
        decodedToken = await verify(token, process.env.JWT_SECRET as string)
        return getToken(decodedToken.sessionId as number) != null
    } catch (error) {
        if (decodedToken && decodedToken.sessionId) {
            deleteToken(decodedToken.sessionId as number)
        }
        return false
    }
}