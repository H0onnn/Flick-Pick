"use client";

import { useGetMoviesByUpComing } from "../queries";
import { Flex } from "@/app/shared/components";
import { MainCarousel } from "../components";

export const UpComingSection = () => {
  const { movieListByUpComing, isFetching } = useGetMoviesByUpComing();

  if (!movieListByUpComing || isFetching) return null;

  return (
    <section className="pt-8">
      <Flex direction="column" className="gap-2">
        <p className="head2 font-bold">상영 예정작</p>
        <MainCarousel type="upcoming" movieList={movieListByUpComing.results} />
      </Flex>
    </section>
  );
};
