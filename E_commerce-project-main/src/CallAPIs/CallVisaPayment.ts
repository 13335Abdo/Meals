"use server"

import fun from "@/utils/fun"
import { getAppUrl } from "@/lib/app-url"
import type { shippingType } from "./CallCashPaymentAPI"

export default async function CallCashVisaAPI(cartId:string ,shipping:shippingType ) {
    const token = await fun()
    const appUrl = getAppUrl()
    if (!token || !cartId) {
        return {
            status: "error",
            message: "Missing token or cart id",
        }
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(appUrl)}`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                token:token as string
            },
            body:JSON.stringify(shipping)

        }
    )
    const text = await res.text()
    try {
      return JSON.parse(text)
    } catch {
      return {
        status: "error",
        message: `Unexpected non-JSON response (${res.status})`,
        raw: text.slice(0, 200),
      }
    }
}
