import Button from "@/components/ui/button";
import Link from "next/link";
import { Button as SButton } from "@/components/ui/sbutton";
import { Bell, User } from "@phosphor-icons/react/dist/ssr";

export default function Header() {
  return (
    <header className="flex-starter sticky top-0 z-50 mx-auto max-w-[1920px] gap-16 bg-neutral-100 px-4 py-4 md:px-8 lg:px-16">
      <Link href="/dashboard" title="Dashboard">
        <h1 className="text-2xl font-bold text-primary-400 lg:text-4xl">
          ShoutMe
        </h1>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/dashboard/notifications">
          <SButton
            variant="ghost"
            type="button"
            className="px-2 py-1 text-primary-400 lg:[&_svg]:size-6"
          >
            <Bell size={20} weight="duotone" />
          </SButton>
        </Link>
        <Link href="/dashboard/profile" className="hidden lg:block">
          <SButton
            variant="ghost"
            type="button"
            className="px-2 py-1 text-primary-400 lg:[&_svg]:size-6"
          >
            <User size={20} weight="duotone" />
          </SButton>
        </Link>
        <Button className="hidden lg:flex">Logout</Button>
      </div>
    </header>
  );
}
