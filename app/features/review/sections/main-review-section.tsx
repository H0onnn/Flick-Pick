import { Flex } from "@/app/shared/components";
import { MainReviewCarousel } from "@/app/features/review/components";

export const MainReviewSection = () => {
  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">사용자 코멘트</p>
        <MainReviewCarousel />
      </Flex>
    </section>
  );
};
