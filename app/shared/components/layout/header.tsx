import { cn } from "@/app/shared/lib/utils";

type HeaderProps = {
  children: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
};

export const Header = (props: HeaderProps) => {
  const { children, leftSlot, rightSlot, className } = props;

  return (
    <header
      className={cn([
        "fixed top-0 left-0 right-0 flex items-center justify-center w-full h-[62px] bg-white z-50 shadow-sm transition-all duration-200 ease-in-out",
        className,
      ])}
    >
      {leftSlot && (
        <div className="absolute left-4 sm:left-6 lg:left-8 xl:left-14 top-1/2 transform -translate-y-1/2">
          {leftSlot}
        </div>
      )}
      {children}
      {rightSlot && (
        <div className="absolute right-4 sm:right-6 lg:right-8 xl:right-14 top-1/2 transform -translate-y-1/2">
          {rightSlot}
        </div>
      )}
    </header>
  );
};
