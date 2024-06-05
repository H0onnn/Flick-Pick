import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import IMAGES from "@/app/public/images";
import {
  Flex,
  Header,
  Avatar,
  AvatarFallback,
  AvatarImage,
  ModeToggle,
} from "@/app/shared/components";
import { LoginModal } from "@/app/features/auth/components";
import { SearchInput } from "@/app/features/search/components";

export const MainHeader = async () => {
  const session = await getServerSession(authOptions);

  const status = session ? "authenticated" : "unauthenticated";

  return (
    <Header
      leftSlot={
        <Link href="/">
          <Image src={IMAGES.LOGO} alt="로고" width={100} height={30} />
        </Link>
      }
      rightSlot={
        <Flex align="center" justify="center" className="gap-3">
          <ModeToggle />
          <SearchInput />
          {status === "authenticated" ? (
            <Link href={`user/${session?.user?.id}`}>
              <Avatar className="sm-max:hidden border border-border border-solid">
                <AvatarImage src={session?.user?.image!} />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
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
