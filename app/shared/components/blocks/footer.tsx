"use client";

import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/auth/login") return null;

  return (
    <footer className="bg-[#373A40] text-white text-center py-5 fiexd bottom-0">
      <p>© 2024. All rights reserved.</p>
    </footer>
  );
};
