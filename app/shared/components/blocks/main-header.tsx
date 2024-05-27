"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";

import IMAGES from "@/public/images";
import { Header } from "@/app/shared/components";
import { LoginModal } from "@/app/features/auth/components";

export const MainHeader = () => {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <Header
      leftSlot={<Image src={IMAGES.LOGO} alt="로고" width={100} height={40} />}
      rightSlot={<LoginModal />}
    >
      {null}
    </Header>
  );
};
