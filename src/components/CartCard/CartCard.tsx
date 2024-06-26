"use client"
import Image from "next/image";
import { useContext } from "react";
import { ProductInfo, ShoppingCartContext } from "@/app/context/ShoppingCartContext";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function CartCard({ id, image, price, quantity, title }: ProductInfo) {
  const { increaseItemQuantity, decreaseItemQuantity, removeFromCart, cartItems } = useContext(ShoppingCartContext);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center relative flex-row">
      <Image src={image} alt="" className="w-24 h-24 rounded-md" width={96} height={96} />
      <div className="ml-4 flex-grow">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{formatCurrency(price)}</p>
        <div className="flex items-center">
          {quantity > 0 ? (
            <>
              <button onClick={() => decreaseItemQuantity(id)} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l">-</button>
              <p className="text-gray-700 px-3">{quantity}</p>
              <button onClick={() => increaseItemQuantity(id)} className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r">+</button>
            </>
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-4 rounded shadow-md flex flex-col items-center z-10">
              <p className="text-gray-700 mb-2">Você deseja remover o produto do carrinho?</p>
              <div className="flex">
                <button onClick={() => removeFromCart(id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600">Sim</button>
                <button onClick={() => increaseItemQuantity(id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Não</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <button onClick={() => removeFromCart(id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remover produto</button>
    </div>
  );
}
