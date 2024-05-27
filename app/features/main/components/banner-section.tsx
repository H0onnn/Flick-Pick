import { Flex } from "@/app/shared/components";
import { MainBanner } from "@/app/features/main/components";

export const BannerSection = () => {
  return (
    <section className="py-5">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">TMDB 순위</p>
        <MainBanner />
      </Flex>
    </section>
  );
};
