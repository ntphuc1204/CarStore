// 📁 src/viewmodels/promotion/listPromotionViewModel.ts
import { useEffect, useState } from "react";
import {
  getAllPromotion,
  deletePromotion,
  searchPromotion,
  type PromotionDto,
} from "../../services/promotionService";
import { toast } from "react-toastify";

export function usePromotionListViewModel() {
  const [promotions, setPromotions] = useState<PromotionDto[]>([]);
  const [searchText, setSearchText] = useState("");
  const [reload, setReload] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionDto | null>(null);
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const fetchPromotions = async () => {
    const data = await getAllPromotion();
    setPromotions(data);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      fetchPromotions();
      return;
    }

    try {
      const results = await searchPromotion(value);
      setPromotions(results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa khuyến mãi này không?")) {
      try {
        await deletePromotion(id);
        toast.success("Xóa khuyến mãi thành công!");
        fetchPromotions();
      } catch (err) {
        toast.error("Xóa thất bại!");
        console.error(err);
      }
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (promotion: PromotionDto) => {
    setSelectedPromotion(promotion);
    setEditModalOpen(true);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleReload = () => {
    setReload(!reload);
  };

  useEffect(() => {
    fetchPromotions();
  }, [reload]);

  return {
    promotions,
    searchText,
    selectedPromotion,
    setSelectedPromotion,
    setReload,
    reload,
    handleSearch,
    handleDelete,
    open,
    handleOpen,
    handleClose,
    editModalOpen,
    setEditModalOpen,
    handleEdit,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    handleReload,
  };
}
