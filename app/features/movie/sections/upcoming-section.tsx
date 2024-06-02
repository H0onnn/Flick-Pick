import { Flex } from "@/app/shared/components";
import { MainCarousel } from "../components";
import { getMoviesByUpcoming } from "../queries/actions";

export const UpComingSection = async () => {
  const movieListByUpcoming = await getMoviesByUpcoming();

  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">상영 예정작</p>
        <MainCarousel type="upcoming" movieList={movieListByUpcoming.results} />
      </Flex>
    </section>
  );
};
