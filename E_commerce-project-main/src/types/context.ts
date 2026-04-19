import type { Dispatch, SetStateAction } from "react";
import type { CartLineItem } from "./cart";
import type { ProductListItem } from "./ecommerce";

export interface FinalContextValue {
  NavCartNo: number;
  setNavCartNo: Dispatch<SetStateAction<number>>;
  totalCartPrice: number;
  settotalCartPrice: Dispatch<SetStateAction<number>>;
  prodect: CartLineItem[];
  setProdects: Dispatch<SetStateAction<CartLineItem[]>>;
  cartUser: string;
  setcartUser: Dispatch<SetStateAction<string>>;
  NavWishNo: number;
  setNavWishNo: Dispatch<SetStateAction<number>>;
  Wishprodect: ProductListItem[];
  setWishProdects: Dispatch<SetStateAction<ProductListItem[]>>;
}
