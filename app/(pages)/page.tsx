import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  MainBannerSection,
  NowPlayingSection,
  TopRatedSection,
  UpComingSection,
} from "@/app/features/movie/sections";
import { MainReviewSection } from "@/app/features/review/sections";

import {
  getMoviesByNowPlaying,
  getMoviesByTopRated,
  getMoviesByUpcoming,
} from "../features/movie/apis";
import { getRecentReviews } from "../features/review/apis";

export default function Page() {
  // prefetch caching data
  getMoviesByNowPlaying();
  getMoviesByTopRated();
  getMoviesByUpcoming();
  getRecentReviews();

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
