import Login from "@/components/ui/auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function page() {
  return <Login />;
}
