import { cn } from "@/lib/utils";

type EmptyProps = {
  emptyText?: string;
  className?: string;
};

export default function Empty({ emptyText, className }: EmptyProps) {
  return (
    <div
      className={cn(
        "grid h-[60dvh] place-content-center place-items-center",
        className
      )}
    >
      <p className="text-center text-base font-medium md:text-lg">
        {emptyText ?? "Nothing Found"}
      </p>
    </div>
  );
}
