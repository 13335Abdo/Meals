"use server";
import { normalizeAddToCartResponse } from "@/types";
import fun from "@/utils/fun";

export default async function DisplayProdectApi() {
  const token = await fun();
  if (!token) {
    return normalizeAddToCartResponse(null);
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    cache: "no-store",
    headers: {
      token : token as string,
    },
  });
  const data: unknown = await res.json();

  return normalizeAddToCartResponse(data);
}
