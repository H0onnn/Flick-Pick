import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/shared/styles";

import { QueryClientPovider as QueryProvider } from "./shared/provider";

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
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 box-border overflow-auto">
          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
