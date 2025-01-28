import { COOKIE_KEYS } from "@/lib/constants";
import { encrypt } from "@/lib/encryption";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getCookie(COOKIE_KEYS.TOKEN)),
  login: (token) => {
    setCookie(COOKIE_KEYS.TOKEN, encrypt(token));
    set({ isAuthenticated: true });
  },
  logout: () => {
    deleteCookie(COOKIE_KEYS.TOKEN);
    set({
      isAuthenticated: false,
    });
  },
}));
