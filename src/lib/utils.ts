import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const getInitials = (value: string): string => {
  const arr = value.split(" ");
  return arr.length === 1 ? arr[0][0] : arr[0][0] + arr[1][0];
};

export const removeKey = <T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> => {
  const newObj = { ...obj };
  if (key in newObj) {
    delete newObj[key];
  }
  return newObj;
};

export const getKeys = <T extends string | number | symbol>(
  obj: Record<T, unknown>
): T[] => {
  return Object.keys(obj) as T[];
};
