import { axiosInstance } from "@/lib/axios";
import {
  LoginInputs,
  LoginResponse,
  RegisterInputs,
  RegisterResponse,
} from "@/lib/types";
import { AxiosResponse } from "axios";

// POST requests
export const register = async (
  body: RegisterInputs
): Promise<AxiosResponse<RegisterResponse>> => {
  return await axiosInstance.post<RegisterResponse>("/api/auth/register", body);
};

export const login = async (
  body: LoginInputs
): Promise<AxiosResponse<LoginResponse>> => {
  return await axiosInstance.post<LoginResponse>("/api/auth/login", body);
};
