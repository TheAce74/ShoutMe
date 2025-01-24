import { COOKIE_KEYS } from "@/lib/constants";
import { decrypt } from "@/lib/encryption";
import { ENV } from "@/lib/env";
import { ApiErrorResponse } from "@/lib/types";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

// creating axios instance
const axiosInstance = axios.create({
  baseURL: ENV.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// intercepting request and adding necessary config
axiosInstance.interceptors.request.use(
  (config) => {
    const token = decrypt(String(getCookie(COOKIE_KEYS.ACCESS_TOKEN)));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepting response and adding necessary logic
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Redirect to login if forbidden or unauthorized
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
      deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);
      if (window.location.href.includes("/dashboard")) {
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }

    // getting error message
    const errorMessage = error.response.data as Omit<
      ApiErrorResponse,
      "status"
    >;

    // setting up a uniform error response
    const errorResponse: ApiErrorResponse = {
      status: error.response.status,
      ...errorMessage,
    };

    return Promise.reject(errorResponse);
  }
);

export { axiosInstance };
