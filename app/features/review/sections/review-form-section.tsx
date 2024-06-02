import { ReviewForm } from "../components";

export const ReviewFormSection = () => {
  return (
    <section className="pt-6">
      <p className="head2 mb-2">코멘트</p>
      <ReviewForm />
      <div className="pt-12">리부 리스트</div>
    </section>
  );
};
