import { cn } from "@/app/shared/utils";
import { Flex } from "@/app/shared/components";

import { getMyActives } from "../apis";

export const MyActivities = async ({ className }: { className?: string }) => {
  const actives = await getMyActives();

  return (
    <Flex
      align="center"
      justify="center"
      className={cn("space-x-16 py-8", className)}
    >
      <Flex direction="column" align="center" className="space-y-2">
        <p className="label2">{actives.reviewsCount}</p>
        <p className="label3 text-gray-500">내 리뷰</p>
      </Flex>

      <Flex direction="column" align="center" className="space-y-2">
        <p className="label2">{actives.likedMoviesCount}</p>
        <p className="label3 text-gray-500">찜한 작품</p>
      </Flex>
    </Flex>
  );
};
