import { Flex } from "@/app/shared/components";
import { DetailReviewList, MoreReviewButton } from "../components";
import { getReviewsByMovieLimit } from "../queries";

export const DetailReviewSection = async ({ movieId }: { movieId: string }) => {
  const reviewsByLimit = await getReviewsByMovieLimit(movieId);

  return (
    <section className="pt-12">
      <Flex align="center" justify="between">
        <p className="head2 mb-2">사용자 코멘트</p>

        <MoreReviewButton />
      </Flex>

      <DetailReviewList reviews={reviewsByLimit} />
    </section>
  );
};
