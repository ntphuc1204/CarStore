import axios from "./axiosInstance";

export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto {
  email: string;
  userName: string;
  password: string;
}
export const login = (form: LoginDto) => {
  return axios.post("/auth/login", form);
};
export const register = (form: RegisterDto) => {
  return axios.post(`/auth/register`, form);
};
