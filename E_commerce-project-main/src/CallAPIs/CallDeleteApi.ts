"use server"

import { AddToCartResponse } from '@/types'
import fun from '@/utils/fun'
import { normalizeAddToCartResponse } from '@/types'

export default async function CallDeleteApi(productId:string):Promise<AddToCartResponse> {


    const token =await fun()

    if (!token) {
        throw new Error("You must be signed in to update your cart.")
    }

    const res =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
        method:"DELETE",
        headers:{
                token : token as string
            }

    })
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data?.message ?? "Unable to remove cart item.")
    }

  return normalizeAddToCartResponse(data)
}


