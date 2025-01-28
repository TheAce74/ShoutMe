import { axiosInstance } from "@/lib/axios";
import {
  GetUserResponse,
  ProfileInputs,
  UpdateUserResponse,
} from "@/lib/types";
import { AxiosResponse } from "axios";

// GET requests
export const getUser = async (): Promise<AxiosResponse<GetUserResponse>> => {
  return await axiosInstance.get<GetUserResponse>("/api/user");
};

// PATCH requests
export const updateUser = async (
  body: Partial<ProfileInputs>
): Promise<AxiosResponse<UpdateUserResponse>> => {
  const formData = new FormData();

  if (body.name) {
    formData.append("name", body.name);
  }

  if (body.email) {
    formData.append("email", body.email);
  }

  if (body.phoneNumber) {
    formData.append("phoneNumber", body.phoneNumber);
  }

  if (body.location) {
    formData.append("location", body.location);
  }

  if (body.password) {
    formData.append("password", body.password);
  }

  if (body.profilePicture) {
    formData.append("profilePicture", body.profilePicture);
  }

  return await axiosInstance.patch<UpdateUserResponse>("/api/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
