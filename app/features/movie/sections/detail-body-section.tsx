import Image from "next/image";
import { Card, CardContent, Flex, StarRating } from "@/app/shared/components";
import { MovieLikeButton } from "@/app/features/movie/components";
import { ReviewForm } from "@/app/features/review/components";
import { MovieDetail } from "@/app/features/movie/models";
import { Review } from "@/app/features/review/models";
import { getMyReviewByMovie } from "@/app/features/review/queries";

export const DetailBodySection = async ({
  movieDetail,
}: {
  movieDetail: MovieDetail;
}) => {
  const myReview = (await getMyReviewByMovie(String(movieDetail.id))) as Review;

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

          <MovieLikeButton
            movieId={String(movieDetail.id)}
            className="absolute top-3 left-3"
          />
        </Card>

        <Flex
          direction="column"
          justify="center"
          className="pt-5 sm:py-5 w-full"
        >
          <p className="head2 mb-2">줄거리</p>
          {movieDetail.overview ? (
            <p className="body2 text-gray-500">{movieDetail.overview}</p>
          ) : (
            <p className="body2 text-gray-500">줄거리가 없습니다.</p>
          )}
          <Flex className="mt-7 gap-8 flex-col sm:flex-row">
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
            <ReviewForm initialReview={myReview} />
          </Flex>
        </Flex>
      </Flex>
    </section>
  );
};
