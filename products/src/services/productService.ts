import axiosInstance from "./axiosInstance";
export interface Product {
  id: number;
  name: string;
  img: string;
  categoryName: string;
  price: number;
  quantity: number;
  categoryID: number;
}
export interface CreateProductDto {
  name: string;
  img: string;
  categoryID: number;
  quantity: number;
  price: number;
}
export interface UpdateProductDto {
  id: number;
  name: string;
  newImage: string;
  categoryID: number;
  quantity: number;
  price: number;
}
export interface ProductByPage {
  currentPage: number;
  pageSize: number;
  totalItem: number;
  totalPages: number;
}
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axiosInstance.get("/Products");
  return res.data;
};
export const getById = async (id: number) => {
  const res = await axiosInstance.get(`/Products/${id}`);
  return res.data;
};

export const createProduct = async (product: CreateProductDto) => {
  const res = await axiosInstance.post("/Products", product);
  return res.data;
};

export const updateProduct = async (id: number, product: UpdateProductDto) => {
  const response = await axiosInstance.put(`/Products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const res = await axiosInstance.delete(`/Products/${id}`);
  return res.data;
};
export const searchProducts = async (key: string): Promise<Product[]> => {
  const response = await axiosInstance.get("/Products/search", {
    params: { key },
  });
  return response.data;
};
export const getProductByPage = async (page: number, pageSize: number) => {
  const res = await axiosInstance.get(
    `/Products/pagination?Page=${page}&PageSize=${pageSize}`
  );
  return res.data;
};
export const getByIdCategory = async (id: number): Promise<Product[]> => {
  const res = await axiosInstance.get(`/Products/category/${id}`);
  return res.data;
};
