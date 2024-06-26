
import { useContext, useEffect, useState } from "react";
import { getData } from "@/app/data/fetchData";
import { ProductCardDescType } from "@/app/types/Product";
import ProductCard from "@/components/ProductCard/ProductCard";
import CartCard from "@/components/CartCard/CartCard";

export default async function Store() {
  const products = await getData();
  
  return (
    <div className="flex flex-wrap justify-center bg-gray h-200px">
      {products.map((product: ProductCardDescType) => (
          <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
