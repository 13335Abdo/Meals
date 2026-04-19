"use server"
import { getServerSession } from 'next-auth'
import { nextAuth } from '@/lib/nextauth'

export default async function fun(): Promise<string | null> {
    const session = await getServerSession(nextAuth)
    return typeof session?.user?.token === "string" ? session.user.token : null
}
