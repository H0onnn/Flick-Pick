import { cn } from "@/app/shared/lib/utils";

type PageLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
};

export const PageLayout = ({
  children,
  header,
  className,
}: PageLayoutProps) => {
  const paddingBottom = header !== null ? "pb-[83px]" : "pb-0";
  const paddingTop = header !== null ? "pt-[62px]" : "pt-0";

  return (
    <div
      className={cn([paddingTop, paddingBottom, "min-h-screen"])}
      vaul-drawer-wrapper="" // eslint-disable-line
    >
      {header}
      <main className={cn([className])}>{children}</main>
    </div>
  );
};
