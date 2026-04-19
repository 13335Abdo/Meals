"use client"
import CallDeleteWhishlistAPI from '@/CallAPIs/CallDeleteWhishlistAPI'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa6'
import { finalContext } from '../_contexts/Ncontext'

export default function DeleteWishlistButton({product}: { product: string }) {
    const {setNavWishNo , setWishProdects} =  useContext(finalContext)
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()
    async function handleDelete(product:string)
    {
        try {
            setIsPending(true)
            setWishProdects((current) => current.filter((item) => item.id !== product))
            setNavWishNo((current) => Math.max(0, current - 1))
            await CallDeleteWhishlistAPI(product)
            router.refresh()
        } finally {
            setIsPending(false)
        }


    }
  return <button disabled={isPending} onClick={()=>handleDelete(product)} className="text-red-600 cursor-pointer hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-60">
                                                <FaTrash size={20} />
                                            </button>
}
