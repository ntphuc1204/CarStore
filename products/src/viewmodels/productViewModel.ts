// viewmodels/useProductViewModel.ts
import { useEffect, useState } from "react";
import { getAllProducts, type Product } from "../services/productService";

export function ProductViewModel() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err))
  }, []);

  return {
    products,
  };
}
