import { Flex } from "@/app/shared/components";
import { UpComingCarousel } from "@/app/features/movie/components";

export const UpComingSection = () => {
  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">상영 예정작</p>
        <UpComingCarousel />
      </Flex>
    </section>
  );
};
