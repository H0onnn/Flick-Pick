"use client";

import { useMemo, useEffect } from "react";
import { Flex } from "@/app/shared/components";
import { CreditsCard } from "../components";
import { MovieDetail } from "@/app/features/movie/models";
import { saveMovie } from "../queries";

export const DetailCreditsSection = ({
  movieDetail,
}: {
  movieDetail: MovieDetail;
}) => {
  const director = useMemo(() => {
    if (!movieDetail) return null;

    return movieDetail.credits.crew.find((crew) => crew.job === "Director");
  }, [movieDetail]);

  useEffect(() => {
    const saveMovieDetail = async () => {
      await saveMovie(movieDetail);
    };

    saveMovieDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="pt-12">
      <p className="head2 mb-2">출연/제작</p>

      <Flex className="flex flex-wrap" asChild>
        <ul>
          <li className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <CreditsCard
              crewName={director?.name ?? "감독 정보 없음"}
              job="감독"
              profilePath={director?.profile_path || ""}
            />
          </li>
          {movieDetail.credits.cast.slice(0, 7).map((cast) => (
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
    </section>
  );
};
