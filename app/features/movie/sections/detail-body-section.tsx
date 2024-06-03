import Image from "next/image";
import { Card, CardContent, Flex, StarRating } from "@/app/shared/components";
import { MovieDetail } from "@/app/shared/types";

export const DetailBodySection = ({
  movieDetail,
}: {
  movieDetail: MovieDetail;
}) => {
  // TODO: 평균 평점, 그래프

  return (
    <section className="pt-6">
      <Flex className="flex-col sm:flex-row gap-6">
        <Card className="relative w-[250px] h-[350px] border-border border-solid border-2 left-[50%] transform -translate-x-[50%] sm:left-0 sm:transform-none">
          <CardContent className="aspect-square w-full h-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              className="object-cover w-full h-full rounded-md"
              fill={true}
              alt="포스터"
            />
          </CardContent>
        </Card>

        <Flex direction="column" className="pt-5 sm:py-5">
          <p className="head2 mb-2">줄거리</p>
          <p className="body2 text-gray-500">{movieDetail.overview}</p>
          <Flex className="mt-7 gap-2 flex-col sm:flex-row">
            <Flex
              direction="column"
              align="center"
              justify="center"
              className="gap-2"
            >
              <p className="head6b">평균 별점</p>
              <p className="head4b">
                {(movieDetail.vote_average / 2).toFixed(1)}
              </p>
              <p className="label3">{`${movieDetail.vote_count.toLocaleString()}개의 별점`}</p>
              <StarRating rating={Math.floor(movieDetail.vote_average / 2)} />
            </Flex>
            <div className="w-full h-[150px] bg-gray-200">그래프</div>
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};
