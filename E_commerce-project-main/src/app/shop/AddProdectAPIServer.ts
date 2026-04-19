"use server"

import type { AddToCartResponse } from "@/types";
import { normalizeAddToCartResponse } from "@/types";
import fun from "@/utils/fun"

export default async function AddProdectAPIServer(
  id: string
): Promise<AddToCartResponse> {

    const token = await fun()

    if (!token) {
        throw new Error("You must be signed in to update your cart.")
    }

    
        const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart",{
            method:"POST",
            body:JSON.stringify({
                productId : id as string
            }),

            headers:{
                "Content-Type":"application/json",
                token : token as string
            }




        })

  const finalData = await res.json();

  if (!res.ok) {
    throw new Error(finalData?.message ?? "Unable to add this item to cart.")
  }

  return normalizeAddToCartResponse(finalData);
}
