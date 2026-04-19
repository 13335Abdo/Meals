import type { ProductCategory } from "@/types";

export async function getAllCategories(): Promise<ProductCategory[]> {

   const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
   const final = await res.json()
   return final.data
    
}
