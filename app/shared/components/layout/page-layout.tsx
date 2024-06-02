import { cn } from "@/app/shared/lib/utils";

type PageLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  isPaddingTop?: boolean;
};

export const PageLayout = ({
  children,
  header,
  className,
  isPaddingTop = true,
}: PageLayoutProps) => {
  const paddingBottom = header !== null ? "pb-[83px]" : "pb-0";
  const paddingTop = header !== null && isPaddingTop ? "pt-[62px]" : "pt-0";

  return (
    <div
      className={cn([
        paddingTop,
        paddingBottom,
        "min-h-screen container px-4 sm:px-6 lg:px-8",
      ])}
      vaul-drawer-wrapper="" // eslint-disable-line
    >
      {header}
      <main className={cn([className])}>{children}</main>
    </div>
  );
};
