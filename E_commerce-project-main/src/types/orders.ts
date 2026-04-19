export interface OrderProduct {
  id: string;
  title: string;
  imageCover: string;
}

export interface OrderLineItem {
  count: number;
  price: number;
  product: OrderProduct;
}

export interface ShippingAddress {
  name: string;
  details: string;
  city: string;
  phone: string;
}

export interface UserOrder {
  _id: string;
  id: number;
  createdAt: string;
  isPaid: boolean;
  totalOrderPrice: number;
  shippingPrice: number;
  shippingAddress: ShippingAddress;
  cartItems: OrderLineItem[];
}

export type UserOrdersApiResult = UserOrder[];
