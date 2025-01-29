import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/app/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const APP_NAME = "ShoutMe";
const APP_DEFAULT_TITLE = "ShoutMe";
const APP_TITLE_TEMPLATE = "%s | ShoutMe";
const APP_DESCRIPTION =
  "ShoutMe is a real-time emergency alert system designed for tertiary institutions, enabling rapid alert dissemination, prompt crisis response, and an intuitive platform for reporting and monitoring emergencies to enhance safety and security.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
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
