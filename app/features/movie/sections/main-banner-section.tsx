import { MainBannerCarousel } from "../components";
import { getMoviesByNowPlaying } from "../apis";

export const MainBannerSection = async () => {
  const movieListByNowPlaying = await getMoviesByNowPlaying();
  return (
    <section>
      <MainBannerCarousel movieList={movieListByNowPlaying} />
    </section>
  );
};
