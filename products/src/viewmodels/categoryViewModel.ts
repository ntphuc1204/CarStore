// viewmodels/client/useCategoryClientViewModel.ts
import { useEffect, useState } from "react";
import {
  getAllCategorys,
  type Category,
} from "../services/categoryService";
import {
  getAllProducts,
  getByIdCategory,
  type Product,
} from "../services/productService";

export function useCategoryClientViewModel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const data = await getAllCategorys();
    setCategories(data);
  };

  const fetchProducts = async (categoryId: number | null = null) => {
    const data = categoryId
      ? await getByIdCategory(categoryId)
      : await getAllProducts();
    setProducts(data);
  };

  const handleCategoryClick = (id: number) => {
    setActiveCategoryId(id);
    fetchProducts(id);
  };

  const handleShowAll = () => {
    setActiveCategoryId(null);
    fetchProducts(null);
  };

  return {
    categories,
    products,
    activeCategoryId,
    handleCategoryClick,
    handleShowAll,
  };
}
