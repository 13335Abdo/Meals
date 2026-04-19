import type { ProductListItem } from "./ecommerce";

export interface CardDesignProps {
  prodect: ProductListItem;
}

export interface TitleSectionsProps {
  featured: string;
  issignin?: boolean;
  products: string;
}

export interface SwiperListProps {
  slidesPerView?: number;
  spaceBetween?: number;
  listofImages: string[] | undefined;
}

export interface SlideData {
  title: string;
  offer: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface CountComponentProps {
  prodect: number;
  prodectQount: number;
  price: number;
}

export interface DesidnMatBeOneUseProps {
  slide: SlideData;
}
