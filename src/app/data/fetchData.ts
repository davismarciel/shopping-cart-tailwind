export const getData = async () => {

  const res = await fetch('https://fakestoreapi.com/products');
  
  if (!res.ok) {
    throw new Error();
  }

  return res.json();
};