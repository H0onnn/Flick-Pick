import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchMovies } from "../features/main/queries";

import { PageLayout, Flex, Button } from "@/app/shared/components";
import { MainBanner } from "@/app/features/main/components";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageLayout
        header={{
          leftSlot: "logo",
          rightSlot: (
            <Flex className="gap-2">
              <Button variant="outline">로그인</Button>
              <Button>회원가입</Button>
            </Flex>
          ),
        }}
      >
        <section className="py-5">
          <Flex direction="column" className="gap-2">
            <p className="head2 font-bold">TMDB 순위</p>
            <MainBanner />
          </Flex>
        </section>
      </PageLayout>
    </HydrationBoundary>
  );
}
