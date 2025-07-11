import { useEffect, useState } from "react";
import {
  deleteCategory,
  getAllCategorys,
  searchCategorys,
  type Category,
} from "../../services/categoryService";
import { toast } from "react-toastify";

export function useCategoryListViewModel() {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchText, setSearchText] = useState("");

  const fetchCategorys = async () => {
    const data = await getAllCategorys();
    setCategorys(data);
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này không?")) {
      try {
        await deleteCategory(id);
        toast.success("Xóa danh mục thành công!");
        fetchCategorys();
      } catch (err) {
        toast.error("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  const handleSearch = async (value: string) => {
    setSearchText(value);
    if (!value.trim()) {
      fetchCategorys();
      return;
    }
    try {
      const result = await searchCategorys(value);
      setCategorys(result);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    categorys,
    page,
    rowsPerPage,
    openAddModal,
    editModalOpen,
    selectedCategory,
    searchText,

    setPage,
    setRowsPerPage,
    setOpenAddModal,
    setEditModalOpen,
    setSelectedCategory,

    handleDelete,
    handleSearch,
    fetchCategorys,
  };
}
