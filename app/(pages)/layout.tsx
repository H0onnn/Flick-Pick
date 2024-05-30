import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/shared/styles";

import {
  QueryClientPovider as QueryProvider,
  SessionProvider,
} from "../shared/provider";
import { Footer, Toaster } from "../shared/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "플릭픽",
  description: "플릭픽과 함께, 당신의 최애 영화를 찾아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <div className="container px-4 sm:px-6 lg:px-8 box-border overflow-auto">
          <QueryProvider>
            <SessionProvider>
              {children}
              <Toaster richColors={true} theme="system" />
            </SessionProvider>
          </QueryProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
