import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { uploadthingRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import NextTopLoader from "nextjs-toploader";
import { extractRouterConfig } from "uploadthing/server";
import { Header } from "./_components/header";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sellfast - a plataforma de compras online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={font.className}>
          <NextTopLoader color="#16a34a" showSpinner={false} />
          <NextSSRPlugin
            routerConfig={extractRouterConfig(uploadthingRouter)}
          />
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
