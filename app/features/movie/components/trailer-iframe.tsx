import { Youtube as YoutubeIcon } from "lucide-react";
import { getMovieDetail, getMovieTrailer } from "../apis";
import { NonDataFallback } from "@/app/shared/components";

export const TrailerIframe = async ({ id }: { id: string }) => {
  const movieDetail = await getMovieDetail(id);
  const trailer = await getMovieTrailer(movieDetail.title);

  const youtubeId = trailer.items.find((item) =>
    item.snippet.title.includes(movieDetail.title),
  )?.id.videoId;

  if (trailer.error) {
    return (
      <section className="pt-6">
        <p className="head2 mb-2">예고편</p>

        <NonDataFallback
          icon={<YoutubeIcon size={72} className="text-gray-500" />}
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
  }

  return (
    <iframe
      id="ytplayer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
      className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[550px]"
      allowFullScreen
    />
  );
};
