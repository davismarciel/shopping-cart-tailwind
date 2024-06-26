"use client"
import { unstable_noStore as noStore } from 'next/cache';
import { createContext, useState, ReactNode } from "react";
import { ShoppingCartProviderProps } from "../types/ShoppingCartProvider";
import { ShoppingCartFunction } from "../types/ShoppingCartFunction";
import { useRouter } from 'next/navigation';

import { getData } from '../data/fetchData';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ShoppingCartContext = createContext({} as ShoppingCartFunction);

export type ProductInfo = {
  id: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  /*
    useLocalStorage<ProductInfo[]> chama o hook com a tipagem ProductInfo[]
    indicando que o estado será um array de ProductInfo.
    "produtos-carrinho" é a key e o array vazio é o initialValue 
  */
  const [cartItem, setCartItem] = useLocalStorage<ProductInfo[]>("produtos-carrinho", []);

  const cartQuantity = cartItem.reduce((quantity, item) => item.quantity + quantity, 0)
  
  const totalPrice = cartItem.map((item => item.price * item.quantity)).reduce((total, price) => total + price, 0);

  function getItemQuantity(id: number) {
    return cartItem.find(item => item.id === id)?.quantity || 0;
  }

  const router = useRouter();
  async function increaseItemQuantity(id: number) {
  noStore()
  // Check if the item is already in the cart
  const existingItem = cartItem.find(item => item.id === id);

  if (existingItem) {
    // If the item is already in the cart, just increase the quantity
    setCartItem(currItems => currItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  } else {
    // If the item is not in the cart, fetch the product data
    const products = await getData();
    const product = products.find((p: { id: number; }) => p.id === id);
    
    if (product) {
      // Add the new item to the cart with the fetched data
      setCartItem(currItems => [...currItems, { id:product.id, image: product.image, title: product.title, price: product.price, quantity: 1 }]);
      router.refresh()
    } else {
      console.error(`Product with id ${id} not found`);
    }
  }
}

  function decreaseItemQuantity(id: number) {
    setCartItem(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 0) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItem(currentItems => {
      return currentItems.filter(item => item.id !== id);
    });
  }

   function cleanCart() {
    setCartItem([]);
  }

  return (
    <ShoppingCartContext.Provider value={{ 
      getItemQuantity, 
      increaseItemQuantity, 
      decreaseItemQuantity,
      cleanCart,
      removeFromCart, 
      cartItems: cartItem, 
      cartQuantity,
      totalPrice,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
