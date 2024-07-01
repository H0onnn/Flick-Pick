import { TrailerIframe } from "../components";

export const DetailTrailerSection = async ({ id }: { id: string }) => {
  return (
    <section className="pt-6">
      <p className="head2 mb-2">예고편</p>

      <TrailerIframe id={id} />
    </section>
  );
};
