"use client";
import React, { createContext, type ReactNode, useEffect, useState } from "react";
import {
  normalizeAddToCartResponse,
  type AddToCartResponse,
  type FinalContextValue,
  type ProductListItem,
} from "@/types";

const defaultContextValue: FinalContextValue = {
  NavCartNo: 0,
  setNavCartNo: () => {},
  totalCartPrice: 0,
  settotalCartPrice: () => {},
  prodect: [],
  setProdects: () => {},
  cartUser: "",
  setcartUser: () => {},
  NavWishNo: 0,
  setNavWishNo: () => {},
  Wishprodect: [],
  setWishProdects: () => {},
};

export const finalContext =
  createContext<FinalContextValue>(defaultContextValue);

export default function Ncontext({
  children,
  userCart,
  userWishlist,
}: {
  children: ReactNode;
  userCart: AddToCartResponse;
  userWishlist: { count: number; data: ProductListItem[] };
}) {
  const cart = normalizeAddToCartResponse(userCart);

  const [NavCartNo, setNavCartNo] = useState(cart.numOfCartItems);
  const [cartUser, setcartUser] = useState(userCart.cartId);
  const [totalCartPrice, settotalCartPrice] = useState(cart.data.totalCartPrice);
  const [prodect, setProdects] = useState(cart.data.products);



  const [NavWishNo, setNavWishNo] = useState(userWishlist.count);
  const [Wishprodect, setWishProdects] = useState(userWishlist.data);

  useEffect(() => {
    const nextCart = normalizeAddToCartResponse(userCart);
    setNavCartNo(nextCart.numOfCartItems);
    setcartUser(userCart.cartId);
    settotalCartPrice(nextCart.data.totalCartPrice);
    setProdects(nextCart.data.products);
  }, [userCart]);

  useEffect(() => {
    setNavWishNo(userWishlist.count);
    setWishProdects(userWishlist.data);
  }, [userWishlist]);












  return (
    <finalContext.Provider
      value={{
        NavCartNo,
        setNavCartNo,
        totalCartPrice,
        settotalCartPrice,
        prodect,
        setProdects,
        cartUser,
        setcartUser,
        NavWishNo,
        setNavWishNo,
        Wishprodect,
        setWishProdects,
      }}
    >
      {children}
    </finalContext.Provider>
  );
}
