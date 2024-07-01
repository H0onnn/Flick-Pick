import { PageLayout, MainHeader } from "@/app/shared/components";
import {
  DetailHeaderSection,
  DetailBodySection,
  DetailCreditsSection,
  DetailTrailerSection,
  DetailRelatedSection,
} from "@/app/features/movie/sections";
import { DetailReviewSection } from "@/app/features/review/sections";
import {
  getMovieDetail,
  getMovieTrailer,
  saveMovie,
} from "@/app/features/movie/apis";
import {
  getMyReviewByMovie,
  getReviewsByMovieLimit,
} from "@/app/features/review/apis";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  getMovieDetail(params.id);
  getReviewsByMovieLimit(params.id);

  const movieDetail = await getMovieDetail(params.id);
  getMyReviewByMovie(String(movieDetail.id));
  getMovieTrailer(movieDetail.title);

  await saveMovie(movieDetail);

  return (
    <>
      <DetailHeaderSection id={params.id} />
      <PageLayout header={<MainHeader />} isPaddingTop={false}>
        <DetailBodySection id={params.id} />

        <DetailCreditsSection id={params.id} />

        <DetailTrailerSection id={params.id} />

        <DetailReviewSection id={params.id} />

        <DetailRelatedSection id={params.id} />
      </PageLayout>
    </>
  );
}
