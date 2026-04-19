"use server"
import fun from '@/utils/fun'
export interface shippingType
{
    shippingAddress:{
        details:string
        phone:string
        city:string
        postalCode?:string
    }
}

export default async function CallCashPaymentAPI(cartId:string ,shipping:shippingType ) {
    const token = await fun()
    if (!token || !cartId) {
        return {
            status: "error",
            message: "Missing token or cart id",
        }
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
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
