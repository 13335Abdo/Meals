"use server";
import type { LoginFormValues } from "@/types";

export async function caall(values: LoginFormValues) {
     const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
                body: JSON.stringify(values),
                method: "post",
                headers: {
                    "content-type": "application/json"
                }
            }
        )
        const data = await res.json()

        console.log("values##########", data);
        return res.ok
    
 }