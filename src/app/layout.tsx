import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ShoutMe",
    default: "ShoutMe",
  },
  description:
    "ShoutMe is a real-time emergency alert system designed for tertiary institutions, enabling rapid alert dissemination, prompt crisis response, and an intuitive platform for reporting and monitoring emergencies to enhance safety and security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.variable,
          "bg-neutral-100 text-neutral-900 antialiased"
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
