import type { ProductListItem } from "./ecommerce";

/** One row in `data.products` from cart APIs */
export interface CartLineItem {
  count: number;
  price: number;
  /** API field */
  product?: ProductListItem;
  /** Legacy typo used in some UI code */
  prodect?: ProductListItem;
}

export interface CartData {
  _id: string;
  totalCartPrice: number;
  cartOwner: string;
  products: CartLineItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

/** Safe default when the cart API fails, user is logged out, or `data` is missing */
export const emptyAddToCartResponse: AddToCartResponse = {
  status: "",
  message: "",
  numOfCartItems: 0,
  cartId: "",
  data: {
    _id: "",
    totalCartPrice: 0,
    cartOwner: "",
    products: [],
    createdAt: "",
    updatedAt: "",
  },
};

export function normalizeAddToCartResponse(
  raw: unknown
): AddToCartResponse {
  if (!raw || typeof raw !== "object") return emptyAddToCartResponse;
  const r = raw as Partial<AddToCartResponse>;
  const d = r.data;
  if (
    !d ||
    typeof d !== "object" ||
    typeof d.totalCartPrice !== "number" ||
    !Array.isArray(d.products)
  ) {
    return emptyAddToCartResponse;
  }
  return {
    status: typeof r.status === "string" ? r.status : "",
    message: typeof r.message === "string" ? r.message : "",
    numOfCartItems:
      typeof r.numOfCartItems === "number" ? r.numOfCartItems : 0,
    cartId: typeof r.cartId === "string" ? r.cartId : "",
    data: d as CartData,
  };
}

export function cartLineProduct(
  item: CartLineItem
): ProductListItem | undefined {
  return item.product ?? item.prodect;
}
