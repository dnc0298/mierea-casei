import CategoryButton from "./CategoryButton";
import { categories } from "../data/categories";

export default function CategoryCards({ selectedCategory, onCategoryChange }) {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-6 font-roboto mb-10">
      <div className="flex items-center justify-center gap-4 w-full max-w-[1400px] mx-auto px-6 py-6 mb-7">
        <span className="h-px flex-1 min-w-[20px] max-w-[150px] bg-gray-300" />

        <h2 className="font-serif font-bold text-lg md:text-2xl tracking-[0.15em] md:tracking-[0.2em] uppercase text-gray-800 whitespace-nowrap">
          CATEGORII APICOLE
        </h2>

        <span className="h-px flex-1 min-w-[20px] max-w-[160px] bg-gray-300" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <CategoryButton
            key={cat.label}
            cat={cat}
            active={selectedCategory === cat.label}
            onClick={() => onCategoryChange(cat.label)}
          />
        ))}
      </div>
    </section>
  );
}
