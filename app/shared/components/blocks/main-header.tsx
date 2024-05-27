"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";

import IMAGES from "@/public/images";
import { Header } from "@/app/shared/components";
import { LoginModal } from "@/app/features/auth/components";

export const MainHeader = () => {
  const { data: session, status } = useSession();

  return (
    <Header
      leftSlot={<Image src={IMAGES.LOGO} alt="로고" width={100} height={40} />}
      rightSlot={
        status === "authenticated" ? (
          <div className="w-[34px] h-[34px] rounded-full">
            <Image
              src={session.user?.image!}
              alt="프로필 사진"
              fill={true}
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <LoginModal />
        )
      }
    >
      {null}
    </Header>
  );
};
