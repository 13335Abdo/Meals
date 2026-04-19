"use server"

import fun from '@/utils/fun'

interface WishlistMutationResponse {
    status: string
    message?: string
    data: string[]
}
export default async function CalladdWishlishAPI(id: string): Promise<WishlistMutationResponse> {

    const token = await fun()

    if (!token) {
        throw new Error("You must be signed in to update your wishlist.")
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
            method:"POST",
            body:JSON.stringify({
                productId : id as string
            }),

            headers:{
                "Content-Type":"application/json",
                token : token as string
            }




        })

  const finalData = await res.json() as Partial<WishlistMutationResponse>;

  if (!res.ok || !Array.isArray(finalData.data)) {
      throw new Error(finalData.message ?? "Unable to update wishlist.")
  }
    


    return {
        status: typeof finalData.status === "string" ? finalData.status : "",
        message: typeof finalData.message === "string" ? finalData.message : undefined,
        data: finalData.data,
    }

}



