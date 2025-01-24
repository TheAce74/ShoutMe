import { ENV } from "@/lib/env";
import { AES, enc } from "crypto-ts";

export const encrypt = (message: string): string => {
  return AES.encrypt(message, ENV.NEXT_PUBLIC_ENCRYPTION_KEY).toString();
};

export const decrypt = (message: string): string => {
  return AES.decrypt(message, ENV.NEXT_PUBLIC_ENCRYPTION_KEY).toString(
    enc.Utf8
  );
};
