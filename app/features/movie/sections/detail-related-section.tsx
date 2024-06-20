import { getMoviesByGenre } from "../apis";
import { MainCarousel } from "../components";

interface DetailRelatedSectionProps {
  title: string;
  genreIds: number[];
}

export const DetailRelatedSection = async ({
  title,
  genreIds,
}: DetailRelatedSectionProps) => {
  const movieList = await getMoviesByGenre(genreIds, 1);

  // title이 같은 영화 제거
  const filteredMovieList = (movieList.results = movieList.results.filter(
    (movie) => movie.title !== title,
  ));

  if (filteredMovieList.length === 0) return null;

  return (
    <section className="pt-12">
      <p className="head2 mb-2">이 작품과 비슷한 영화</p>
      <MainCarousel type="related" movieList={filteredMovieList} />
    </section>
  );
};
