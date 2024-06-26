export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24 bg-gray-350 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8">
        Projeto que simula um website e-commerce onde simulamos uma lista de produtos e um carrinho de compras.
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">O que podemos fazer?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Listar produtos</li>
          <li>Adicionar um produto a um carrinho de compras</li>
          <li>Adicionar e remover produtos por unidade</li>
          <li>Limpar o carrinho de compras</li>
          <li>Ver o valor total do carrinho de compras</li>
        </ul>
      </div>
    </main>
  );
}
