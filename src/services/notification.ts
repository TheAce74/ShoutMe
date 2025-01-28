import { axiosInstance } from "@/lib/axios";
import { GetNotificationsResponse, PaginatedResponse } from "@/lib/types";
import { AxiosResponse } from "axios";

// GET requests
export const getNotifications = async (
  page: number,
  pageSize?: number
): Promise<AxiosResponse<PaginatedResponse<GetNotificationsResponse>>> => {
  return await axiosInstance.get<PaginatedResponse<GetNotificationsResponse>>(
    "/api/notification",
    {
      params: {
        page,
        pageSize,
      },
    }
  );
};
