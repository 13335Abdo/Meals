import { responseType } from "@/app/brands/page";

export async function CallAllCat():Promise<responseType[]> {

   const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")

   const final = await res.json()
   console.log("final",final.data);
   
   return final.data
    
}