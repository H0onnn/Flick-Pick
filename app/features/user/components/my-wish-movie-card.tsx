import Link from "next/link";
import Image from "next/image";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "@/app/shared/constants";

import { Flex } from "@/app/shared/components";

interface MyWishMovieCardProps {
  movieId: string;
  poster: string;
  title: string;
  releaseDate: string;
}

export const MyWishMovieCard = ({
  movieId,
  poster,
  title,
  releaseDate,
}: MyWishMovieCardProps) => {
  return (
    <Link href={`/movie/${movieId}`} prefetch>
      <Flex align="center" direction="column" className="space-y-1">
        <div className="relative w-[130px] h-[190px]">
          <Image
            src={`${IMAGE_BASE_URL.DEFAULT}${IMAGE_SIZE.POSTER.W185}${poster}`}
            alt="포스터"
            fill={true}
            className="object-contain"
            placeholder="blur"
            blurDataURL={IMAGE_BASE_URL.BLUR}
          />
        </div>

        <p className="max-w-[130px] label3 truncate">{title}</p>

        <p className="text-xs text-gray-500">{releaseDate} 개봉</p>
      </Flex>
    </Link>
  );
};
