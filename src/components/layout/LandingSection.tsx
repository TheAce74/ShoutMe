import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type LandingSectionProps = PropsWithChildren<{
  id: string;
  className?: string;
}>;

export default function LandingSection({
  children,
  id,
  className,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "mx-auto max-w-[1920px] p-4 md:px-8 lg:px-16 lg:py-8",
        className
      )}
    >
      {children}
    </section>
  );
}
