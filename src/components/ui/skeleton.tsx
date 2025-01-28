import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-4 w-[50px] animate-pulse rounded-md bg-primary/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
