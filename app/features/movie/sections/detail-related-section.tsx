import { getMovieDetail, getMoviesByGenre } from "../apis";
import { MainCarousel } from "../components";

export const DetailRelatedSection = async ({ id }: { id: string }) => {
  const movieDetail = await getMovieDetail(id);

  const genreIds = movieDetail.genres.map((genre) => genre.id);

  getMoviesByGenre(genreIds);

  const movieList = await getMoviesByGenre(genreIds);

  // title이 같은 영화 제거
  const filteredMovieList = (movieList.results = movieList.results.filter(
    (movie) => movie.title !== movieDetail.title,
  ));

  if (filteredMovieList.length === 0) return null;

  return (
    <section className="pt-12">
      <p className="head2 mb-2">이 작품과 비슷한 영화</p>
      <MainCarousel type="related" movieList={filteredMovieList} />
    </section>
  );
};
