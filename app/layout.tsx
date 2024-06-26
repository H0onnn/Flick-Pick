import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/shared/styles";

import { SessionProvider, ThemeProvider } from "./shared/provider";
import { Footer, Toaster } from "./shared/components";

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
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <div className="relative box-border overflow-auto">{children}</div>
            <Toaster richColors={true} theme="light" />
          </ThemeProvider>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
