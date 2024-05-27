import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchMovies } from "../features/main/queries";

import { PageLayout, MainHeader } from "@/app/shared/components";
import { BannerSection } from "@/app/features/main/components";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout header={<MainHeader />}>
        <BannerSection />
      </PageLayout>
    </HydrationBoundary>
  );
}
