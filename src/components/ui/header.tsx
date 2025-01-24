"use client";

import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex-starter sticky top-0 z-50 mx-auto max-w-[1920px] gap-16 bg-neutral-100 px-4 py-4 md:px-8 lg:px-16">
      <Link href="/" title="Home">
        <h1 className="text-2xl font-bold text-primary-400 lg:text-4xl">
          ShoutMe
        </h1>
      </Link>
      <div className="hidden md:flex md:items-center md:gap-8">
        <Link
          href="/auth/login"
          className={cn(pathname === "/auth/login" && "hidden")}
        >
          <Button>Login</Button>
        </Link>
        <Link
          href="/auth/register"
          className={cn(pathname === "/auth/register" && "hidden")}
        >
          <Button variant="inverted">Signup</Button>
        </Link>
      </div>
    </header>
  );
}
