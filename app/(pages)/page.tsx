export const revalidate = 60; // 1분 마다 캐싱 데이터 갱신

import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  MainBannerSection,
  NowPlayingSection,
  TopRatedSection,
  UpComingSection,
} from "@/app/features/movie/sections";
import { MainReviewSection } from "@/app/features/review/sections";

export default function Page() {
  return (
    <>
      <MainBannerSection />
      <PageLayout header={<MainHeader />} isPaddingTop={false}>
        <MainReviewSection />
        <NowPlayingSection />
        <TopRatedSection />
        <UpComingSection />
      </PageLayout>
    </>
  );
}
