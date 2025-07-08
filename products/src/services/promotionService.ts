import axiosInstance from "./axiosInstance";

export interface PromotionDto {
  id: number;
  title: string;
  discountPercent: number;
  quantity: number;
  initialQuantity: number;
  startDate: string;
  endDate: string;
  status: string;
  productId: number;
}
export interface AddPromotionDto {
  title: string;
  discountPercent: number;
  quantity: number;
  startDate: string;
  endDate: string;
  productId: number;
}
export interface UpdatePromotionDto {
  id: number;
  title: string;
  discountPercent: number;
  quantity: number;
  startDate: string;
  endDate: string;
  productId: number;
}
export const getAllPromotion = async () => {
  const res = await axiosInstance.get(`/Promotions`);
  return res.data;
};
export const PromotionAdd = async (addPromotion: AddPromotionDto) => {
  const res = await axiosInstance.post(`/Promotions`, addPromotion);
  return res.data;
};
export const updatePromotion = async (
  id: number,
  promotion: UpdatePromotionDto
) => {
  const res = await axiosInstance.put(`/Promotions/${id}`, promotion);
  return res.data;
};
export const deletePromotion = async (id: number) => {
  const res = await axiosInstance.delete(`/Promotions/${id}`);
  return res.data;
};
export const getByProductId = async (productId: number) => {
  const res = await axiosInstance.get(`/Promotions/by-product/${productId}`);
  return res.data;
};
export const getByPromotionId = async (id: number) => {
  const res = await axiosInstance.get(`/Promotions/by-id/${id}`);
  return res.data;
};
export const searchPromotion = async (key: string): Promise<PromotionDto[]> => {
  const response = await axiosInstance.get("/Promotions/search", {
    params: { key },
  });
  return response.data;
};
