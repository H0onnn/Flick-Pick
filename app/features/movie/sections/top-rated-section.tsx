import { Flex } from "@/app/shared/components";
import { TopRatedCarousel } from "@/app/features/movie/components";

export const TopRatedSection = () => {
  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">TMDB 순위</p>
        <TopRatedCarousel />
      </Flex>
    </section>
  );
};
