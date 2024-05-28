import { Flex } from "@/app/shared/components";
import { NowPlayingCarousel } from "@/app/features/movie/components";

export const NowPlayingSection = () => {
  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">현재 상영작</p>
        <NowPlayingCarousel />
      </Flex>
    </section>
  );
};
