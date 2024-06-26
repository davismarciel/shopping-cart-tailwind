import { useEffect, useState } from "react";

/* 
  A key é tipada como uma string, que recebe "produtos-carrinho"
  initialValue é tipado como um generic T, que pode ser tanto um valor direto de tipo T 
  quanto uma função que retorna um valor de tipo T
  Neste caso, T é um array de produtos, então initialValue pode ser tanto um array de produtos ou uma função que retorna um array de produtos
*/
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {

    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (initialValue instanceof Function) {
      return (initialValue as () => T)()
    } else {
      return initialValue;
    }
  })

  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]

}