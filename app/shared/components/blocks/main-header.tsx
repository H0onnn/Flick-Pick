"use client";

import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import IMAGES from "@/public/images";
import { Flex, Header } from "@/app/shared/components";
import { LoginModal } from "@/app/features/auth/components";
import { SearchInput } from "@/app/features/search/components";

export const MainHeader = () => {
  const { data: session, status } = useSession();

  return (
    <Header
      leftSlot={<Image src={IMAGES.LOGO} alt="로고" width={100} height={40} />}
      rightSlot={
        <Flex align="center" justify="center" className="gap-3">
          <SearchInput />
          {status === "authenticated" ? (
            <Link href={`user/${session.user?.id}`}>
              <div className="relative w-[34px] h-[34px] rounded-full sm-max:hidden border border-border border-solid">
                <Image
                  src={session.user?.image!}
                  alt="프로필 사진"
                  fill={true}
                  className="object-cover rounded-full"
                />
              </div>
            </Link>
          ) : (
            <LoginModal />
          )}
        </Flex>
      }
    >
      {null}
    </Header>
  );
};
