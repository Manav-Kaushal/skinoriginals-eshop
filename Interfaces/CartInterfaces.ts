import { ReactNode } from "react";

export interface CartProviderInterface {
  children: ReactNode;
}

export interface CartContextInterface {
  openCart?: () => void;
  closeCart?: () => void;
  getItemQty: (id: number) => number;
  increaseItemQty: (product: CartItemInterface) => void;
  decreaseItemQty: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQty: number;
  cartItems: CartItemInterface[];
}

export interface CartItemInterface {
  availableQty: number;
  category: string;
  createdAt: string;
  description: string;
  id: number;
  images: any;
  inStock: boolean;
  metaInfo: any;
  price: number;
  publishedAt: string;
  reviews: { count: number; rating: number };
  shortDescription: string;
  size: string;
  sku: string;
  slug: string;
  title: string;
  updatedAt: string;
  url: string;
  qty: number;
  newArrival?: boolean;
  href?: string;
  netQuantity?: number;
}
