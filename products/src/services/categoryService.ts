import axiosInstance from "./axiosInstance";

export interface Category {
  id: number;
  name: string;
  brand: string;
  logo: string;
}
export interface CreateCategory {
  name: string;
  brand: string;
  logo: string;
}
export interface UpdateCategory {
  id: number;
  name: string;
  brand: string;
  newLogo: string;
}

export const getAllCategorys = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/Category");
  return res.data;
};
export const createCategory = async (
  category: CreateCategory
): Promise<CreateCategory[]> => {
  const res = await axiosInstance.post("/Category", category);
  return res.data;
};
export const updateCategory = async (id: number, category: UpdateCategory) => {
  const response = await axiosInstance.put(`/Category/${id}`, category);
  return response.data;
};
export const deleteCategory = async (id: number) => {
  const res = await axiosInstance.delete(`/Category/${id}`);
  return res.data;
};
export const searchCategorys = async (key: string): Promise<Category[]> => {
  const response = await axiosInstance.get("/Category/search", {
    params: { key },
  });
  return response.data;
};
