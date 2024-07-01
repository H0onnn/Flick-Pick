import { cache } from "react";
import { fetchYoutube, API_VARS } from "@/app/shared/apis";
import { Youtube } from "../models";

export const getMovieTrailer = cache(
  async (query: string): Promise<Youtube> => {
    return await fetchYoutube.get(
      `?part=snippet&q=${query}예고편&type=video&key=${API_VARS.YOUTUBE_API_KEY}`,
    );
  },
);
