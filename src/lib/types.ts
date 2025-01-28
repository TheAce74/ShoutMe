import {
  addEmergencySchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "@/lib/schema";
import { z } from "zod";

// client
export type ButtonVariants = "primary" | "inverted" | "active" | "resolved";

export type RegisterInputs = z.infer<typeof registerSchema>;

export type LoginInputs = z.infer<typeof loginSchema>;

export type AddEmergencyInputs = z.infer<typeof addEmergencySchema>;

export type ProfileInputs = z.infer<typeof profileSchema>;

// server
export type ApiErrorResponse = {
  status: number;
  message: string;
  devMessage: string;
};

export type PaginatedResponse<T> = {
  pagination: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
  };
  data: T;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export type Emergency = {
  _id: string;
  title: string;
  description: string;
  location: string;
  isActive: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

// auth service
export type RegisterResponse = {
  message: string;
  user: User;
  token: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

// emergency service
export type AddEmergencyResponse = {
  message: string;
  emergency: Emergency;
};

export type GetEmergenciesResponse = Array<Emergency>;

export type ResolveEmergencyResponse = {
  message: string;
  emergency: Emergency;
};

// user service
export type GetUserResponse = User;

export type UpdateUserResponse = {
  message: string;
  user: User;
};

// notification service
export type GetNotificationsResponse = Array<Notification>;
