"use client";

import { cn } from "../../utils";

import { motion } from "framer-motion";

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const TabButton = ({
  children,
  active = false,
  ...props
}: TabButtonProps) => {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "flex items-center justify-center relative pb-2 w-full text-sm font-bold border-b border-gray200",
        active ? "text-primary" : "text-gray-500",
      )}
    >
      {children}
      {active && (
        <motion.div
          layoutId="tab"
          className="absolute z-10 -bottom-[1px] h-[2px] w-full bg-primary"
        />
      )}
    </button>
  );
};
