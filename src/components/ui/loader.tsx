"use client";

import { cn } from "@/lib/utils";
import { Hourglass } from "react-loader-spinner";

type LoaderProps = {
  className?: string;
};

export default function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        "grid h-[89.2dvh] place-content-center place-items-center",
        className
      )}
    >
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#F40000", "#000000"]}
      />
    </div>
  );
}
