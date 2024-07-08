import { Flex } from "@/app/shared/components";
import { DetailReviewList, MoreReviewButton } from "../components";
import { getReviewsByMovieLimit } from "../apis";

export const DetailReviewSection = async ({ id }: { id: string }) => {
  const reviewsByLimit = await getReviewsByMovieLimit(id);
  const reviews = reviewsByLimit.slice(0, 3);

  return (
    <section className="pt-12">
      <Flex align="center" justify="between">
        <p className="head2 mb-2">사용자 코멘트</p>

        {reviewsByLimit.length > 3 && <MoreReviewButton />}
      </Flex>

      <DetailReviewList reviews={reviews} />
    </section>
  );
};
