"use server"

import { AddToCartResponse } from "@/types"
import { normalizeAddToCartResponse } from "@/types"
import fun from "@/utils/fun"

export default async function CallUpdateApi(productId:string,count:number):Promise<AddToCartResponse> {


    const token =await fun()

    if (!token) {
        throw new Error("You must be signed in to update your cart.")
    }

    const res =await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`,{
        method:"PUT",
        body:JSON.stringify({count}),
        headers:{
                token : token as string,
                
                "Content-Type":"application/json"
            }

    })
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data?.message ?? "Unable to update cart item.")
    }

  return normalizeAddToCartResponse(data)
}
