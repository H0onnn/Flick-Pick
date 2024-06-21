import { Flex } from "@/app/shared/components";
import { MainCarousel } from "../components";
import { getMoviesByNowPlaying } from "../apis";

export const NowPlayingSection = async () => {
  const movieListByNowPlaying = await getMoviesByNowPlaying();

  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">현재 상영작</p>
        <MainCarousel
          movieList={movieListByNowPlaying.results
            .sort((a, b) => b.vote_average - a.vote_average)
            .sort(
              (a, b) =>
                Number(b.release_date.split("-")[0]) -
                Number(a.release_date.split("-")[0]),
            )}
        />
      </Flex>
    </section>
  );
};
