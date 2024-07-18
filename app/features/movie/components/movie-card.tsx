import Image from "next/image";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "@/app/shared/constants";
import { Clapperboard } from "lucide-react";
import { Movie } from "@/app/features/movie/models";
import { Flex, Badge, Card, CardContent } from "@/app/shared/components";

interface MovieCardProps
  extends Pick<
    Movie,
    "poster_path" | "title" | "release_date" | "vote_average"
  > {
  rank?: number;
  type?: "default" | "upcoming" | "related";
}

export const MovieCard = ({
  poster_path,
  title,
  release_date,
  vote_average,
  rank,
  type = "default",
}: MovieCardProps) => {
  return (
    <>
      <Card className="relative w-full h-full">
        {rank && (
          <Badge className="absolute rounded-full z-10 left-1 top-1 opacity-70">
            <span className="text-sm">{rank}</span>
          </Badge>
        )}
        {poster_path ? (
          <CardContent className="flex aspect-square items-center justify-center">
            <Image
              src={`${IMAGE_BASE_URL.DEFAULT}${IMAGE_SIZE.POSTER.W342}${poster_path}`}
              alt="영화 포스터"
              className="rounded-sm object-cover"
              fill={true}
              placeholder="blur"
              blurDataURL={IMAGE_BASE_URL.BLUR}
            />
          </CardContent>
        ) : (
          <Flex
            align="center"
            justify="center"
            className="h-full bg-gray-100 rounded-sm"
          >
            <Clapperboard className="w-12 h-12 text-gray-500" />
          </Flex>
        )}
      </Card>

      <Flex direction="column" className="mt-2 gap-1">
        <span className="label2 truncate">{title}</span>
        <Flex className="gap-1 label3 text-gray-500 hidden sm:flex">
          {type !== "upcoming" ? (
            <>
              <span>{release_date.split("-")[0]}</span>
              <span>·</span>
              <span>평점 {vote_average}</span>
            </>
          ) : (
            <span>{release_date} 개봉 예정</span>
          )}
        </Flex>
      </Flex>
    </>
  );
};
