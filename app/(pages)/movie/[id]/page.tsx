import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchMovie } from "@/app/features/movie/queries";

import { PageLayout, MainHeader } from "@/app/shared/components";

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
      <PageLayout header={<MainHeader />}>
        <section className="py-5">
          <h1>Movie Detail</h1>
        </section>
      </PageLayout>
    </HydrationBoundary>
  );
}
