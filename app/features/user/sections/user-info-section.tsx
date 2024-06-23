import { getServerSession } from "@/app/shared/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Flex,
} from "@/app/shared/components";

import { SignoutButton, WithrawButton } from "../components";
import { getMyActives } from "../apis";

export const UserInfoSection = async () => {
  const session = await getServerSession();
  const actives = await getMyActives();

  const user = session?.user;

  return (
    <Flex
      direction="column"
      className="bg-gray-50 border-border border-solid border rounded-md min-w-[384px] w-[384px] h-[370px] p-6 hidden lg:flex"
      asChild
    >
      <section>
        <p className="head6sb">프로필 정보</p>

        <Flex
          direction="column"
          align="center"
          justify="center"
          className="gap-2 pt-5"
        >
          <Avatar className="border border-border border-solid w-24 h-24">
            <AvatarImage src={user?.image as string} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>

          <p className="label2">{user?.name}</p>
        </Flex>

        <Flex align="center" justify="center" className="space-x-16 py-8">
          <Flex direction="column" align="center" className="space-y-2">
            <p className="label2">{actives.reviewsCount}</p>
            <p className="label3 text-gray-500">내 리뷰</p>
          </Flex>

          <Flex direction="column" align="center" className="space-y-2">
            <p className="label2">{actives.likedMoviesCount}</p>
            <p className="label3 text-gray-500">찜한 작품</p>
          </Flex>
        </Flex>

        <Flex align="center" justify="center" className="space-x-2 w-full">
          <SignoutButton />

          <WithrawButton />
        </Flex>
      </section>
    </Flex>
  );
};
