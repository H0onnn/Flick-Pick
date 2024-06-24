import Link from "next/link";
import { Search } from "lucide-react";
import { Button, Flex } from "@/app/shared/components";

export const HeaderSearchButton = () => {
  return (
    <Button
      variant="outline"
      className="w-72 lg:hidden sm-max:hidden border-border border-solid border"
      asChild
    >
      <Link href="/search">
        <Flex align="center" className="gap-2 w-full">
          <Search />
          나의 최애 영화찾기
        </Flex>
      </Link>
    </Button>
  );
};
