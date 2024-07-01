import Link from "next/link";
import { getServerSession } from "../../utils";

import { Menu, Inbox } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Flex,
  Button,
} from "@/app/shared/components";
import { MyActivities, SignoutButton } from "@/app/features/user/components";
import { ThemeSelectButtons } from "../theme";
import { LoginModal } from "@/app/features/auth/login/components";

export const HeaderMenuButton = async () => {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <Sheet>
      <SheetTrigger asChild className="sm-max:flex md:hidden ml-4">
        <Menu role="button" size={32} />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-8">
        {user && (
          <>
            <SheetHeader>
              <Flex align="center" className="space-x-3">
                <Avatar className="border border-border border-solid w-12 h-12">
                  <AvatarImage src={user.image as string} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>

                <SheetTitle>반가워요, {user.name}님!</SheetTitle>
              </Flex>
            </SheetHeader>

            <MyActivities className="p-0" />

            <Button type="button" variant="outline" className="w-full" asChild>
              <Link href={`/user/info/${user.id}`}>
                <Flex align="center" className="space-x-2">
                  <Inbox size={16} />
                  <span>내 정보</span>
                </Flex>
              </Link>
            </Button>
          </>
        )}

        {!user && (
          <SheetHeader>
            <SheetTitle>로그인이 필요해요!</SheetTitle>
            <LoginModal isMobile={true} />
          </SheetHeader>
        )}

        <ThemeSelectButtons />

        {user && (
          <SheetFooter className="absolute bottom-6 right-6">
            <SignoutButton />
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
