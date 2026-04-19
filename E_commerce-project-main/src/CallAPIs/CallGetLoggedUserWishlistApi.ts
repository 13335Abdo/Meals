import fun from '@/utils/fun';
import { emptyWishlistResponse, normalizeWishlistResponse, type WishlistResponse } from '@/types';

export default async function CallGetLoggedUserWishlistApi(): Promise<WishlistResponse> {
    const token = await fun()

    if (!token) {
        return emptyWishlistResponse
    }

    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
            cache: "no-store",
            headers:{
                token
            }
        })

        if (!res.ok) {
            return emptyWishlistResponse
        }

        const final: unknown = await res.json()
        return normalizeWishlistResponse(final)
    } catch {
        return emptyWishlistResponse
    }
}
