"use server";
import type { SignupFormValues } from "@/types";
import { cookies } from "next/headers";

export async function caal(val: SignupFormValues) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
            body: JSON.stringify(val),
            method: "post",
            headers: {
                "content-type": "application/json"
            }
        }
    )
    const data = await res.json()

    const mycookies = await cookies()

    mycookies.set("token", data.token ,
        {
            httpOnly:true,
            secure:true,
            maxAge:60*60*24,
            sameSite:"strict"
        }
    )
    console.log("values11111111111111111111", data);
    return res.ok
        
    } catch (error) {
        console.log("error" , error);
        
        
    }



}