import { axiosInstance } from "@/lib/axios";
import {
  AddEmergencyInputs,
  AddEmergencyResponse,
  GetEmergenciesResponse,
  PaginatedResponse,
  ResolveEmergencyResponse,
} from "@/lib/types";
import { AxiosResponse } from "axios";

// GET requests
export const getEmergencies = async (
  page: number,
  search?: string,
  pageSize?: number
): Promise<AxiosResponse<PaginatedResponse<GetEmergenciesResponse>>> => {
  return await axiosInstance.get<PaginatedResponse<GetEmergenciesResponse>>(
    "/api/emergency",
    {
      params: {
        page,
        search,
        pageSize,
      },
    }
  );
};

// POST requests
export const addEmergency = async (
  body: AddEmergencyInputs
): Promise<AxiosResponse<AddEmergencyResponse>> => {
  return await axiosInstance.post<AddEmergencyResponse>("/api/emergency", body);
};

// PATCH requests
export const resolveEmergency = async (
  emergencyId: string
): Promise<AxiosResponse<ResolveEmergencyResponse>> => {
  return await axiosInstance.patch<ResolveEmergencyResponse>(
    `/api/emergency/${emergencyId}`
  );
};
