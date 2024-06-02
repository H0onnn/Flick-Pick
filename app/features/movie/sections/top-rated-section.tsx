"use client";

import { useGetMoviesByTopRated } from "../queries";

import { Flex } from "@/app/shared/components";
import { MainCarousel } from "../components";

export const TopRatedSection = () => {
  const { movieListByTopRated, isFetching } = useGetMoviesByTopRated();

  if (!movieListByTopRated || isFetching) return null;

  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">TMDB 순위</p>
        <MainCarousel movieList={movieListByTopRated.results} />
      </Flex>
    </section>
  );
};
