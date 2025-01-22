"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { PropsWithChildren } from "react";

type ProvidersProps = Readonly<PropsWithChildren>;

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <ProgressBar
        color="#F40000"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
