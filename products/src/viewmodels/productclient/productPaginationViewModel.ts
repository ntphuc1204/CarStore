// src/viewmodels/productPaginationViewModel.ts
import { useEffect, useState } from "react";
import { getProductByPage, type Product, type ProductByPage } from "../../services/productService";

export function useProductPaginationViewModel() {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<ProductByPage | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const pageSize = 6;

  const nextPage = () => setPage((prev) => prev + 1);
  const previousPage = () => setPage((prev) => prev - 1);
  const goToPage = (pageNum: number) => setPage(pageNum);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductByPage(page, pageSize);
        setProducts(data.data);
        setPagination(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
      }
    };
    fetchData();
  }, [page]);

  return {
    page,
    pagination,
    products,
    nextPage,
    previousPage,
    goToPage,
  };
}
