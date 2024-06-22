"use server"

import { db } from "@/lib/db"
import { ScoutSchema, ScoutSchemaType } from "@/schema/scout.schema"
import { getUser } from "@/services/user.service"
import { clerkClient } from "@clerk/nextjs/server"

export const CREATE_SCOUT = async (values: ScoutSchemaType) => {
    const {success, data} = ScoutSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const scout = await db.scout.findFirst({
        where: {
            OR: [
                {
                    phone: values.phone
                },
                {
                    email: values.email
                }
            ]
        }
    })

    if (scout) {
        throw new Error("Scout already exists")
    }

    const { userId, clerkId } = await getUser()
    
    const newScout = await db.scout.create({
        data: {
            ...data,
            userId
        }
    })

    await db.user.update({
        where: {
            id: userId
        },
        data: {
            role: "Scout"
        }
    })

    await clerkClient.users.updateUser(clerkId, {
        publicMetadata: {
            role: "scout",
            status: "pending"
        }
    })

    return {
        success: "Registration successfull",
        id: newScout.id
    }
}


export const GET_SCOUT = async (scoutId: string) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if (!scout) {
        throw new Error("Scout not found")
    }

    return {scout}
}