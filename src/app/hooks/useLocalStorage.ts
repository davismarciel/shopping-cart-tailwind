// hooks/useLocalStorage.ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Verifica se estamos no lado do cliente antes de acessar localStorage
  const isClient = typeof window !== 'undefined';
  /* 
  A key é tipada como uma string, que recebe "produtos-carrinho"
  initialValue é tipado como um generic T, que pode ser tanto um valor direto de tipo T 
  quanto uma função que retorna um valor de tipo T
  Neste caso, T é um array de produtos, então initialValue pode ser tanto um array de produtos ou uma função que retorna um array de produtos
  */
  const [value, setValue] = useState<T>(() => {
    if (isClient) {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }
    
    if (typeof initialValue === 'function') {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isClient]);

  return [value, setValue] as [T, typeof setValue];
}



