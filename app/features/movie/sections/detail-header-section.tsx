import Image from "next/image";
import { IMAGE_BASE_URL, IMAGE_SIZE } from "@/app/shared/constants";
import { Flex } from "@/app/shared/components";
import { formatHour } from "@/app/shared/utils";
import { getMovieDetail } from "../apis";

export const DetailHeaderSection = async ({ id }: { id: string }) => {
  const movieDetail = await getMovieDetail(id);

  return (
    <section>
      <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[550px] bg-cover bg-center">
        <Image
          src={`${IMAGE_BASE_URL.DEFAULT}${IMAGE_SIZE.BACKDROP.W1280}${movieDetail.backdrop_path}`}
          fill={true}
          className="object-cover"
          alt="배경 이미지"
          placeholder="blur"
          blurDataURL={IMAGE_BASE_URL.BLUR}
        />

        <Flex
          direction="column"
          className="absolute bottom-5 sm:bottom-10 text-white gap-3 font-light w-full"
        >
          <div className="container mx-auto">
            <h1 className="head1">{movieDetail.title}</h1>

            <Flex direction="column" className="gap-2">
              <p>{movieDetail.original_title}</p>
              <Flex className="gap-1">
                <p>{movieDetail.release_date}</p>•
                {movieDetail.genres.length > 1 ? (
                  <p>{`${movieDetail.genres[0].name}/${movieDetail.genres[1].name}`}</p>
                ) : (
                  <p>{movieDetail.genres[0].name}</p>
                )}
                •<p>{movieDetail.production_countries[0].name}</p>
              </Flex>
              <Flex align="center" className="gap-1">
                <p>{formatHour(movieDetail.runtime)}</p>•
                <p>TMDB 평점 {Number(movieDetail.vote_average.toFixed(1))}점</p>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </div>
    </section>
  );
};
