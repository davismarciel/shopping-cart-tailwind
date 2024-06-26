"use client"
import Image from "next/image";
import { Suspense, useContext, useState } from "react";
import { ShoppingCartContext } from "@/app/context/ShoppingCartContext";
import { ProductCardDescType } from "@/app/types/Product";
import {formatCurrency } from '@/app/utils/formatCurrency'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
export default function ProductCard({ id, image, title, price }: ProductCardDescType) {
  const { increaseItemQuantity } = useContext(ShoppingCartContext);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const handleClick =() => {
    setIsLoading(true);
    increaseItemQuantity(id)

    setTimeout(() => {
      setIsLoading(false);
      router.push("/pages/cart")
    }, 1000);
  }

  return (
    <div className="flex justify-center flex-wrap">
      <div className="flex flex-col justify-between bg-white rounded-lg overflow-hidden w-80 m-2 p-4 border-4 border-gray-500">
          <Image unoptimized src={image} alt={title} width={50} height={50} className="object-fill rounded-t-lg h-2/3 w-full"/>
          <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>
          <div className="text-gray-700 mb-2 text-center">{formatCurrency(price)}</div>
          <button
          onClick={handleClick}
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Adicionar ao carrinho"
            )}
        </button>

        </div>
      </div>
  );
}
