import Register from "@/components/ui/auth/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function page() {
  return <Register />;
}
