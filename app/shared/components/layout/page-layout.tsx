import { Header } from "./header";
import { cn } from "@/app/shared/lib/utils";

type PageLayoutProps = {
  children: React.ReactNode;
  header?: {
    title?: React.ReactNode;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    headerClass?: string;
  };
  className?: string;
};

export const PageLayout = ({
  children,
  header,
  className,
}: PageLayoutProps) => {
  //   const paddingBottom =
  //     isBottomTabAcitivity && !isMyHome ? "pb-[83px]" : "pb-0";
  const paddingTop = header !== null ? "pt-[62px]" : "pt-0";

  return (
    <div
      className={cn([paddingTop])}
      vaul-drawer-wrapper="" // eslint-disable-line
    >
      {header != null ? (
        <Header
          leftSlot={header.leftSlot}
          rightSlot={header.rightSlot}
          className={header.headerClass}
        >
          {header.title}
        </Header>
      ) : null}
      <main className={cn([className])}>{children}</main>
    </div>
  );
};
