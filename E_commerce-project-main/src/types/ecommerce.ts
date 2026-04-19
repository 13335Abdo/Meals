/** Shared API shapes for Routemisr-style product data */

export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

/** Product as returned in list/card views */
export interface ProductListItem {
  id: string;
  title: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  priceAfterDiscount?: number;
  price: number;
  imageCover: string;
  category: ProductCategory;
}

/** Single product detail from `/products/:id` */
export interface ProductDetail {
  id: string;
  brand: ProductCategory;
  category: ProductCategory;
  title: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  priceAfterDiscount: number;
  price: number;
  imageCover: string;
  quantity: number;
  description: string;
  images: string[];
}
