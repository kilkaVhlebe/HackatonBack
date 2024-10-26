import { PrismaClient } from "@prisma/client";
import type { User, Token, BookingQueue } from "@prisma/client";

const prisma = new PrismaClient()

export const createUser = async (user: {fullName: string, login: string, password: string}): Promise<User> => {
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

export const createBooking = async (userId: number, startPoint: string, endPoint: string,startpoint_departure: string, availableSeatsCount: number, autoBooking: boolean,wagon_type:boolean,  isActive: boolean): Promise<BookingQueue> => {
    return await prisma.bookingQueue.create({data: {userId, startPoint, endPoint,startpoint_departure,  availableSeatsCount, autoBooking,isActive, wagon_type }})
}

export const getBookingById = async (bookingId: number): Promise<BookingQueue | null> => {
    return await prisma.bookingQueue.findUnique({
        where: {
            id: bookingId
        }
    })
}

export const getBookingByUserId = async (userId: number): Promise<BookingQueue[]> => {
    return await prisma.bookingQueue.findMany({
        where: {
            userId
        }
    })
}

export const getBookingByStatus = async(isActive: Boolean):Promise<BookingQueue[]>  => {
    return await prisma.bookingQueue.findMany({
        where: {
            isActive
        }
    })
}

export const changeBookingStatus = async (bookingId: number): Promise<BookingQueue | null> => {
    const booking = await getBookingById(bookingId)
    
    if (!booking) {
        return null
    }

    return await prisma.bookingQueue.update({
        where: {
            id: bookingId
        },
        data: {
            isActive: !booking.isActive
        }
    })
}

export const deleteBooking = async (bookingId: number): Promise<BookingQueue> => {
    return await prisma.bookingQueue.delete({
        where: {
            id: bookingId
        }
    })
}