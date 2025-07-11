import { useEffect, useState } from "react";
import {
  getAllProducts,
  searchProducts,
  deleteProduct,
  type Product,
} from "../../services/productService";
import { toast } from "react-toastify";

export function useProductListViewModel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [reload, setReload] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [reload]);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleReload = () => setReload(!reload);

  const handleSearch = async (value: string) => {
    setSearchText(value);
    if (!value.trim()) {
      fetchProducts();
    } else {
      const results = await searchProducts(value);
      setProducts(results);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      try {
        await deleteProduct(id);
        toast.success("Xóa sản phẩm thành công!");
        fetchProducts();
      } catch (err) {
        toast.error("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  return {
    products,
    page,
    rowsPerPage,
    searchText,
    selectedProduct,
    addModalOpen,
    editModalOpen,
    setPage,
    setRowsPerPage,
    setAddModalOpen,
    setEditModalOpen,
    setSelectedProduct,
    handleReload,
    handleSearch,
    handleDelete,
  };
}
