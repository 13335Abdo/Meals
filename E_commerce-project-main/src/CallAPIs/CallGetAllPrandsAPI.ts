import { responseType } from "@/app/brands/page";


export async function CallGetAllPrands():Promise<responseType[]> {

   const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
   const final = await res.json()
   console.log("final",final.data);
   
   return final.data
    
}
