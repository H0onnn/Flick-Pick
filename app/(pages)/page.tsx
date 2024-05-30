import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  fetchMoviesByTopRated,
  fetchMoviesByNowPlaying,
  fetchMoviesByUpComing,
} from "../features/movie/queries";

import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  NowPlayingSection,
  TopRatedSection,
  UpComingSection,
} from "@/app/features/movie/sections";
import { MainReviewSection } from "@/app/features/review/sections";

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["movies", "top_rated"],
      queryFn: fetchMoviesByTopRated,
      staleTime: 1000 * 60 * 60 * 24,
    }),
    queryClient.prefetchQuery({
      queryKey: ["movies", "now_playing"],
      queryFn: fetchMoviesByNowPlaying,
      staleTime: 1000 * 60 * 60 * 24,
    }),
    queryClient.prefetchQuery({
      queryKey: ["movies", "upcoming"],
      queryFn: fetchMoviesByUpComing,
      staleTime: 1000 * 60 * 60 * 24,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout header={<MainHeader />}>
        <MainReviewSection />
        <NowPlayingSection />
        <TopRatedSection />
        <UpComingSection />
      </PageLayout>
    </HydrationBoundary>
  );
}
