"use client";

import { useMemo } from "react";
import { Youtube } from "../models";

interface TrailerIframProps {
  trailer: Youtube;
  movieTitle: string;
}

export const TrailerIframe = ({ trailer, movieTitle }: TrailerIframProps) => {
  const youtubeId = useMemo(() => {
    return trailer.items.find((item) => item.snippet.title.includes(movieTitle))
      ?.id.videoId;
  }, [movieTitle, trailer.items]);

  return (
    <iframe
      id="ytplayer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
      className="w-full h-80 sm:h-96 md:h-[450px] lg:h-[550px]"
      allowFullScreen
    />
  );
};
