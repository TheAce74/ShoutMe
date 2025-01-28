import NextAuthWrapper from "@/components/layout/NextAuthWrapper";
import Header from "@/components/ui/dashboard/Header";
import MobileMenu from "@/components/ui/dashboard/MobileMenu";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthWrapper>
      <div className="pb-24 lg:pb-0">
        <Header />
        {children}
        <MobileMenu />
      </div>
    </NextAuthWrapper>
  );
}
