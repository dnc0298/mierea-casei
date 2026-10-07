"use client";

import { useState } from "react";
import CategoryCards from "./CategoryCard";
import Products from "./Products";

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Toate");

  return (
    <>
      <CategoryCards
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Products selectedCategory={selectedCategory} />
    </>
  );
}
