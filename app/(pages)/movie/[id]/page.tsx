import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchMovie } from "@/app/features/movie/queries";

import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  DetailHeaderSection,
  DetailBodySection,
  DetailCreditsSection,
} from "@/app/features/movie/sections";
import { ReviewFormSection } from "@/app/features/review/sections";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movie", params.id],
    queryFn: () => fetchMovie(params.id),
    staleTime: Infinity,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailHeaderSection movieId={params.id} />
      <PageLayout header={<MainHeader />} isPaddingTop={false}>
        <DetailBodySection movieId={params.id} />
        <DetailCreditsSection movieId={params.id} />
        <ReviewFormSection />
      </PageLayout>
    </HydrationBoundary>
  );
}
