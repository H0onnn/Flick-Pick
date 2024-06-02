"use client";

import { useMovieDetail } from "../queries";
import Image from "next/image";
import { Card, CardContent, Flex } from "@/app/shared/components";

export const DetailBodySection = ({ movieId }: { movieId: string }) => {
  const { movieInfo } = useMovieDetail({ id: movieId });

  if (!movieInfo) return null;

  // TODO: 평균 평점, 그래프

  return (
    <section className="pt-6">
      <Flex className="flex-col sm:flex-row gap-6">
        <Card className="relative w-[250px] h-[350px] border-border border-solid border-2 left-[50%] transform -translate-x-[50%] sm:left-0 sm:transform-none">
          <CardContent className="aspect-square w-full h-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
              className="object-cover w-full h-full rounded-md"
              fill={true}
              alt="포스터"
            />
          </CardContent>
        </Card>

        <Flex direction="column" className="pt-5 sm:py-5">
          <p className="head2 mb-2">줄거리</p>
          <p className="body2 text-gray-500">{movieInfo.overview}</p>
          <Flex className="mt-7 gap-2 flex-col sm:flex-row">
            <div className="w-full h-[150px] bg-gray-200">별점</div>
            <div className="w-full h-[150px] bg-gray-200">그래프</div>
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};
