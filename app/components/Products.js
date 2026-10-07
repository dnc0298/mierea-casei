import { ProductCard } from "./ProductCard";
import { products } from "../data/products";

function Products({ selectedCategory }) {
  const filteredProducts =
    selectedCategory === "Toate"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
      <div className="flex items-center justify-center gap-4 w-full max-w-[1400px] mx-auto px-6 py-6 mb-10">
        <span className="h-px flex-1 min-w-[20px] max-w-[150px] bg-gray-300" />

        <h2 className="font-serif font-bold text-lg md:text-2xl tracking-[0.15em] md:tracking-[0.2em] uppercase text-gray-800 whitespace-nowrap">
          Selecția Casei
        </h2>

        <span className="h-px flex-1 min-w-[20px] max-w-[160px] bg-gray-300" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-6 md:gap-3 lg:gap-4 max-w-7xl mx-auto mb-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
