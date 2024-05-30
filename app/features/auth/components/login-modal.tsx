"use client";

import Image from "next/image";
import IMAGES from "@/public/images";
import ICONS from "@/public/icons";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  Button,
  Flex,
} from "@/app/shared/components";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const LoginModal = () => {
  const handleLogin = async (provider: string) => {
    try {
      await signIn(provider);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("로그인에 실패했습니다.", {
          description: error.message,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="head6sb">
          로그인/가입
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[488px] p-12">
        <DialogHeader className="flex-col gap-4 items-center justify-center">
          <Image src={IMAGES.LOGO} alt="로고" width={150} height={50} />
          <p className="head2 text-center">
            플릭픽과 함께,
            <br />
            당신의 최애 영화를 찾아보세요!
          </p>
        </DialogHeader>

        <Button
          type="submit"
          className="bg-kakao mt-6 py-6 hover:bg-kakao/70"
          onClick={() => handleLogin("kakao")}
        >
          <Flex align="center" justify="center" className="w-full gap-2">
            <Image src={ICONS.KAKAO} alt="카카오 로고" width={24} height={24} />
            <p className="text-black">카카오로 시작하기</p>
          </Flex>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
