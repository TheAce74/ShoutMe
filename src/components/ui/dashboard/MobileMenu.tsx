"use client";

import { cn } from "@/lib/utils";
import { House, Siren, User } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Home",
    href: "/dashboard",
    icon: <House size={20} weight="duotone" />,
  },
  {
    label: "Emergencies",
    href: "/dashboard/emergencies",
    icon: <Siren size={20} weight="duotone" />,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: <User size={20} weight="duotone" />,
  },
];

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex-starter fixed bottom-0 left-0 right-0 border-t-2 border-neutral-200 bg-neutral-100 px-4 lg:hidden">
        {links.map((link) => (
          <li key={link.label} className="basis-1/3">
            <Link
              href={link.href}
              className={cn(
                "trans-all after:trans-all relative block py-4 text-center font-medium before:mx-auto before:block before:h-[2px] before:w-0 before:-translate-y-[18px] before:bg-primary-400 before:text-transparent before:content-['*'] hover:text-primary-400 focus-visible:text-primary-400",
                pathname === link.href && "text-primary-400 before:w-[50%]"
              )}
            >
              <span className="mx-auto block w-max">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
