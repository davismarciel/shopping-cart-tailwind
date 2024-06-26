"use client"
import { ShoppingCartContext } from "@/app/context/ShoppingCartContext";
import CartCard from "@/components/CartCard/CartCard";
import { useContext } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function CartPage() {
  const { cartItems, totalPrice, cleanCart } = useContext(ShoppingCartContext);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Carrinho de compras</h1>
      <div className="text-1xl font-bold text-red-600 flex justify-end">
        <button onClick={cleanCart} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remover todos os itens</button>
      </div>
      <div className="space-y-4">
        {cartItems.map(item => (
          <CartCard key={item.id} {...item} />
        ))}
      </div>
      <div className="mt-8 p-4 border-t border-gray-200 flex justify-end">
        <div className="text-center">
          <div className="text-xl font-semibold">Total:</div>
          <div className="text-3xl font-bold text-blue-600">{formatCurrency(totalPrice)}</div>
        </div>
      </div>
    </div>
  );
}
