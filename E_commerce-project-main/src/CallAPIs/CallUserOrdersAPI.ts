import fun from "@/utils/fun";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id?: string;
}

export default async function CallUserOrdersAPI() {
  const token = await fun();

  if (!token) {
    return [];
  }

  const { id } = jwtDecode<JwtPayload>(token);

  if (!id) {
    return [];
  }

  console.log("decoded", id);

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  const data = await res.json();
  console.log("dataaaaa", data);

  return data;
}
