"use client"
import CalladdWishlishAPI from '@/CallAPIs/CalladdWishlishAPI'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CiHeart } from 'react-icons/ci'
import { toast } from 'sonner'
import { finalContext } from '../_contexts/Ncontext'

export default function WishListButton({ id }: { id: string }) {

    const { setNavWishNo } = useContext(finalContext)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    async function handleAddProdectInWishlist() {
        try {
            setIsPending(true)
            const response = await CalladdWishlishAPI(id)
            setNavWishNo(response.data.length)
            toast.success(response.message ?? "Added to wishlist", {
                richColors: true,
                position: "top-center"
            })
            router.refresh()
        } catch {
            toast.error("Unable to update wishlist right now.", {
                richColors: true,
                position: "top-center"
            })
        } finally {
            setIsPending(false)
        }

    }

    return (
        <button disabled={isPending} onClick={handleAddProdectInWishlist} className="bg-white p-1 rounded-full hover:text-red-600 font-semibold disabled:cursor-not-allowed disabled:opacity-60">

            <CiHeart className="cursor-pointer" />
        </button>
    )
}
