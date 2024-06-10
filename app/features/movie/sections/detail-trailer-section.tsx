import { NonDataFallback } from "@/app/shared/components";
import { TrailerIframe } from "../components";
import { getMovieDetail, getMovieTrailer } from "../queries";
import { Youtube } from "lucide-react";

export const DetailTrailerSection = async ({
  movieId,
}: {
  movieId: string;
}) => {
  const movieDetail = await getMovieDetail(movieId);
  //   const trailer = await getMovieTrailer(movieDetail.title);

  //   if (trailer.error) {
  return (
    <section className="pt-6">
      <p className="head2 mb-2">예고편</p>

      <NonDataFallback
        icon={<Youtube size={72} className="text-gray-500" />}
        fallbackText={
          <>
            현재 예고편 정보를 불러올 수 없습니다.
            <br />
            {`다음에 다시 시도해주세요. :(`}
          </>
        }
        className="h-80 sm:h-96 md:h-[450px] lg:h-[550px]"
      />
    </section>
  );
  //   }

  //   if (!trailer.items) return null;

  return (
    <section className="pt-6">
      <p className="head2 mb-2">예고편</p>

      {/* <TrailerIframe trailer={trailer} movieTitle={movieDetail.title} /> */}
    </section>
  );
};
