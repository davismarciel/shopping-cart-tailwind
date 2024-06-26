import { ProductInfo } from "../context/ShoppingCartContext";

export type ShoppingCartFunction = {
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: ProductInfo[];
  totalPrice: number;
  cleanCart: () => void;
}