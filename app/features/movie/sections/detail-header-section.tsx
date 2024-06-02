"use client";

import { Flex } from "@/app/shared/components";
import { useMovieDetail } from "../queries";
import Image from "next/image";
import { formatHour } from "@/app/shared/utils";

export const DetailHeaderSection = ({ movieId }: { movieId: string }) => {
  const { movieInfo } = useMovieDetail({ id: movieId });

  if (!movieInfo) return null;

  return (
    <section>
      <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[550px] bg-cover bg-center">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`}
          fill={true}
          className="full_img_cover"
          alt="배경 이미지"
        />

        <Flex
          direction="column"
          className="absolute left-3 bottom-5 sm:left-10 sm:bottom-10 text-white gap-3 font-light"
        >
          <h1 className="head1">{movieInfo.title}</h1>

          <Flex direction="column" className="gap-1.5">
            <p>{movieInfo.original_title}</p>
            <Flex className="gap-1">
              <p>{movieInfo.release_date}</p>•
              <p>{`${movieInfo.genres[0].name}/${movieInfo.genres[1].name}`}</p>
              •<p>{movieInfo.production_countries[0].name}</p>
            </Flex>
          </Flex>
          <Flex align="center" className="gap-1">
            <p>{formatHour(movieInfo.runtime)}</p>•
            <p>TMDB 평점 {Number(movieInfo.vote_average.toFixed(1))}점</p>
          </Flex>
        </Flex>
      </div>
    </section>
  );
};
