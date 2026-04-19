import type { ProductListItem } from "./ecommerce";

export interface WishlistResponse {
  count: number;
  data: ProductListItem[];
  status?: string;
  message?: string;
}

export const emptyWishlistResponse: WishlistResponse = {
  count: 0,
  data: [],
  status: "",
  message: "",
};

export function normalizeWishlistResponse(raw: unknown): WishlistResponse {
  if (!raw || typeof raw !== "object") return emptyWishlistResponse;

  const wishlist = raw as Partial<WishlistResponse>;

  return {
    count: typeof wishlist.count === "number" ? wishlist.count : 0,
    data: Array.isArray(wishlist.data) ? wishlist.data : [],
    status: typeof wishlist.status === "string" ? wishlist.status : "",
    message: typeof wishlist.message === "string" ? wishlist.message : "",
  };
}
