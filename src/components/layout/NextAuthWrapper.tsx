"use client";

import Loader from "@/components/ui/loader";
import { useGetUser } from "@/hooks/tanstack/queries/user/useGetUser";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

type NextAuthWrapperProps = PropsWithChildren;

// This handles the redirect logic for an unauthenticated user
export default function NextAuthWrapper({ children }: NextAuthWrapperProps) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams({ redirect: pathname });
  const redirectUrl = `/auth/login?${params.toString()}`;

  const { user, isUserPending } = useGetUser();

  useEffect(() => {
    // redirect if not authenticated
    if (!isAuthenticated) {
      replace(redirectUrl);
    }
  }, [isAuthenticated, replace, redirectUrl]);

  return !isUserPending && user?._id ? (
    <>{children}</>
  ) : (
    <Loader className="h-screen" />
  );
}
