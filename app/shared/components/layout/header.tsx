"use client";

import { useScroll } from "@/app/shared/hooks";

import { cn } from "@/app/shared/utils";

type HeaderProps = {
  children: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
};

export const Header = (props: HeaderProps) => {
  const { children, leftSlot, rightSlot, className } = props;
  const { isScrolled } = useScroll();

  return (
    <header
      className={cn([
        "fixed top-0 left-0 right-0 flex items-center justify-center h-[62px] bg-white z-50 border-b border-solid border-border shadow-sm",
        `transition-all duration-300 ease-in-out ${isScrolled ? "bg-white" : "bg-transparent"} border-b-0`,
        className,
      ])}
    >
      <div className="container relative">
        {leftSlot && (
          <div className="absolute left-4 sm:left-6 lg:left-8 top-1/2 transform -translate-y-1/2">
            {leftSlot}
          </div>
        )}
        {children}
        {rightSlot && (
          <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 transform -translate-y-1/2">
            {rightSlot}
          </div>
        )}
      </div>
    </header>
  );
};
