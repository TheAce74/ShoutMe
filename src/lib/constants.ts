export const COOKIE_KEYS = {
  TOKEN: "TOKEN",
} as const;

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/;

export const QUERY_KEYS = {
  USER: ["USER"],
  EMERGENCY: ["EMERGENCY"],
  NOTIFICATION: ["NOTIFICATION"],
};

export const DEFAULT_PAGE_SIZE = 20;
