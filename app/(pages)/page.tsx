import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import {
  fetchMoviesByTopRated,
  fetchMoviesByNowPlaying,
} from "../features/main/queries";

import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  NowPlayingSection,
  TopRatedSection,
} from "@/app/features/main/sections";

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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout header={<MainHeader />}>
        <NowPlayingSection />
        <TopRatedSection />
      </PageLayout>
    </HydrationBoundary>
  );
}
