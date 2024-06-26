"use client"

import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";
import { ShoppingCartContext } from "@/app/context/ShoppingCartContext";

export default function NavBar() {

  const {cartQuantity} = useContext(ShoppingCartContext);

  return (
    <nav className="bg-black p-1 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <span className="text-black bg-white hover:bg-gray-300 px-4 py-2 rounded">Sobre o projeto</span>
            </Link>
          </li>
          <li>
            <Link href="/pages/store">
               <span className="text-black bg-white hover:bg-gray-300 px-4 py-2 rounded">Loja de produtos</span>
            </Link>
          </li>
        </ul>
        <div className="relative">
          <Link href="/pages/cart">
            <button className="relative text-white text-lg font-bold bg-slate-100 rounded-full p-2">
              <Image src="/cart-icon.svg" width={35} height={35} alt="cart" />
            </button>
          <span className="absolute top-1 right-3.5 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/1 -translate-y-1/0">
            {cartQuantity}
          </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
