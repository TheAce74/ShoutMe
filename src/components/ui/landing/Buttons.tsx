"use client";

import Button from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";

export default function Buttons() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Link href="/dashboard">
      <Button>Dashboard</Button>
    </Link>
  ) : (
    <div className="flex items-center gap-4 lg:gap-8">
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
      <Link href="/auth/register">
        <Button variant="inverted">Signup</Button>
      </Link>
    </div>
  );
}
