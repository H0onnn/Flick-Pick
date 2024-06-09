import { Flex } from "@/app/shared/components";
import Image from "next/image";
import { formatHour } from "@/app/shared/utils";
import { MovieDetail } from "@/app/features/movie/models";

export const DetailHeaderSection = ({
  movieDetail,
}: {
  movieDetail: MovieDetail;
}) => {
  return (
    <section>
      <div className="relative h-80 sm:h-96 md:h-[450px] lg:h-[550px] bg-cover bg-center">
        <Image
          src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
          fill={true}
          className="full_img_cover"
          alt="배경 이미지"
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
