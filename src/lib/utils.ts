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

export const checkDate = (
  date: Date | string
): "Today" | "Yesterday" | "Beyond" => {
  const givenDate = new Date(date);
  const now = new Date();

  // Reset times for comparison
  givenDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffInMilliseconds = now.getTime() - givenDate.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return "Beyond";
  }
};

export const isValidFile = (
  file: File,
  size: number,
  extraValidTypes?: string[]
): boolean => {
  // note: size arg is in megabytes
  const maxFileSize = size * 1024 * 1024;
  const defaultValidTypes = ["image/jpeg", "image/png", "image/jpg"];
  const validTypes = extraValidTypes
    ? [...defaultValidTypes, ...extraValidTypes]
    : defaultValidTypes;

  const isValidType: boolean = validTypes.includes(file.type);
  const isUnderSizeLimit: boolean = file.size < maxFileSize;

  return isValidType && isUnderSizeLimit;
};
