import { Flex } from "@/app/shared/components";
import { MainCarousel } from "../components";
import { getMoviesByTopRated } from "../apis";

export const TopRatedSection = async () => {
  const movieListByTopRated = await getMoviesByTopRated();

  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">TMDB 순위</p>
        <MainCarousel movieList={movieListByTopRated.results} />
      </Flex>
    </section>
  );
};
