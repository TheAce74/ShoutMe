import Login from "@/components/ui/auth/Login";
import Loader from "@/components/ui/loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function page() {
  return (
    <Suspense fallback={<Loader />}>
      <Login />
    </Suspense>
  );
}
