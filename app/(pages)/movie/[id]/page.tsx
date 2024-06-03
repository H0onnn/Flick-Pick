import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  DetailHeaderSection,
  DetailBodySection,
  DetailCreditsSection,
  DetailRelatedSection,
} from "@/app/features/movie/sections";
import { DetailReviewSection } from "@/app/features/review/sections";
import { getMovieDetail } from "@/app/features/movie/queries";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const movieDetail = await getMovieDetail(params.id);

  return (
    <>
      <DetailHeaderSection movieDetail={movieDetail} />
      <PageLayout header={<MainHeader />} isPaddingTop={false}>
        <DetailBodySection movieDetail={movieDetail} />

        <DetailCreditsSection movieDetail={movieDetail} />

        <DetailReviewSection />

        <DetailRelatedSection
          title={movieDetail.title}
          genreIds={movieDetail.genres.map((genre) => genre.id)}
        />
      </PageLayout>
    </>
  );
}
