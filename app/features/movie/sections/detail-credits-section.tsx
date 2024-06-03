"use client";

import { useMemo } from "react";
import { useMovieDetail } from "../queries";
import {
  Flex,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/shared/components";
import { CreditsCard } from "../components";

export const DetailCreditsSection = ({ movieId }: { movieId: string }) => {
  const { movieInfo } = useMovieDetail({ id: movieId });

  const director = useMemo(() => {
    if (!movieInfo) return null;

    return movieInfo.credits.crew.find((crew) => crew.job === "Director");
  }, [movieInfo]);

  if (!movieInfo) return null;

  return (
    <section className="pt-12">
      <p className="head2 mb-2">출연/제작</p>

      <Carousel
        opts={{
          align: "start",
          watchDrag: true,
        }}
      >
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselContent>
          <CarouselItem>
            <Flex className="flex flex-wrap" asChild>
              <ul>
                <li className="w-full sm:w-1/2 lg:w-1/4 mb-6">
                  <CreditsCard
                    crewName={director?.name ?? "감독 정보 없음"}
                    job="감독"
                    profilePath={director?.profile_path || ""}
                  />
                </li>
                {movieInfo.credits.cast.slice(0, 7).map((cast) => (
                  <li key={cast.id} className="w-full sm:w-1/2 lg:w-1/4 mb-6">
                    <CreditsCard
                      crewName={cast.name}
                      job={`${
                        cast.character.split("(")[1] ? "성우" : "배우"
                      } • ${cast.character.split("(")[0]}`}
                      profilePath={cast.profile_path || ""}
                    />
                  </li>
                ))}
              </ul>
            </Flex>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};