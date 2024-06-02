"use client";

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useScroll } from "@/app/shared/hooks";
import Image from "next/image";
import Link from "next/link";
import IMAGES from "@/public/images";
import {
  Flex,
  Header,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/shared/components";
import { LoginModal } from "@/app/features/auth/components";
import { SearchInput } from "@/app/features/search/components";

export const MainHeader = () => {
  const { data: session, status } = useSession();
  const { isScrolled } = useScroll();

  return (
    <Header
      leftSlot={
        <Link href="/">
          <Image src={IMAGES.LOGO} alt="로고" width={100} height={30} />
        </Link>
      }
      rightSlot={
        <Flex align="center" justify="center" className="gap-3">
          <SearchInput />
          {status === "authenticated" ? (
            <Link href={`user/${session.user?.id}`}>
              <Avatar className="sm-max:hidden border border-border border-solid">
                <AvatarImage src={session.user?.image!} />
                <AvatarFallback>{session.user?.name}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <LoginModal />
          )}
        </Flex>
      }
      className={`transition-all duration-300 ease-in-out ${isScrolled ? "bg-white" : "bg-transparent"} border-b-0`}
    >
      {null}
    </Header>
  );
};
