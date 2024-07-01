import { getServerSession } from "@/app/shared/utils";
import Image from "next/image";
import Link from "next/link";
import IMAGES from "@/app/public/images";
import {
  Flex,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/shared/components";
import { Header, MobileSearchButton, HeaderMenuButton } from "./header";
import { LoginModal } from "@/app/features/auth/components";
import {
  HeaderSearchButton,
  SearchInput,
} from "@/app/features/search/components";
import { ModeToggle } from "../theme";

export const MainHeader = async () => {
  const session = await getServerSession();

  const status = session ? "authenticated" : "unauthenticated";

  return (
    <Header
      leftSlot={
        <Link href="/">
          <Image src={IMAGES.LOGO} alt="로고" width={100} height={30} />
        </Link>
      }
      rightSlot={
        <Flex align="center" justify="center" className="sm-max:gap-0 gap-3">
          <ModeToggle />
          <MobileSearchButton />
          <HeaderMenuButton />
          <HeaderSearchButton />
          <SearchInput />
          {status === "authenticated" ? (
            <Link href={`/user/info/${session?.user?.id}`}>
              <Avatar className="sm-max:hidden border border-border border-solid">
                <AvatarImage src={session?.user?.image!} />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="sm-max:hidden">
              <LoginModal />
            </div>
          )}
        </Flex>
      }
    >
      {null}
    </Header>
  );
};
