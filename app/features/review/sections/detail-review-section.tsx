import { DetailReviewList } from "../components";

export const DetailReviewSection = ({ movieId }: { movieId: string }) => {
  return (
    <section className="pt-12">
      <p className="head2 mb-2">사용자 코멘트</p>
      <DetailReviewList movieId={movieId} />
    </section>
  );
};
