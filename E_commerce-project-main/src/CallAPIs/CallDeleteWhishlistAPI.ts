"use server"

import fun from '@/utils/fun'

export default async function CallDeleteWhishlistAPI(productId:string) {

    const token =await fun()

    if (!token) {
        throw new Error("You must be signed in to update your wishlist.")
    }
    
        const res =await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            method:"DELETE",
            headers:{
                    token : token as string
                }
    
        })
        const data = await res.json()

        if (!res.ok) {
            throw new Error(data?.message ?? "Unable to remove wishlist item.")
        }
        


      return data


}
