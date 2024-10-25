import { PrismaClient } from "@prisma/client";
import type { User, Token } from "@prisma/client";

const prisma = new PrismaClient()

export const createUser = async (user: {fullName: string, login: string, password: string}) => {
    return await prisma.user.create({data: user })
}

export const getUserById = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
}

export const getUserByLogin = async (login: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            login: login,
        },
    })
}

export const updateUser = async (user: {id: number, fullName?: string, password?: string}): Promise<User> => {
    return await prisma.user.update({
        where: {
            id: user.id
        },
        data: user,
    })
}

export const deleteUser = async (id: number): Promise<User> => {
    return await prisma.user.delete({
        where: {
            id: id,
        },
    })
}

export const createToken = async (userId: number): Promise<Token> => {
    return await prisma.token.create({
        data: {
            userId,
        },
    })
}

export const getToken = async (sessionId: number): Promise<Token | null> => {
    return await prisma.token.findUnique({
        where: {
            id: sessionId,
        },
    })
}

export const deleteToken = async (sessionId: number): Promise<Token> => {
    return await prisma.token.delete({
        where: {
            id: sessionId,
        },
    })
}