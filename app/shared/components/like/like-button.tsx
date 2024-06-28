// TODO: refactoring components to use shared components

import { cn } from "@/app/shared/utils";
import { Heart } from "lucide-react";
import { toggleLikeMovie } from "@/app/features/movie/apis";
import { toggleLikeReview } from "@/app/features/review/apis";

interface LikeButtonProps {
  id: string;
  isLiked: boolean;
  type: "movie" | "review";
  size?: number;
  className?: string;
}

export const LikeButton = ({
  id,
  type,
  isLiked,
  size = 34,
  className,
}: LikeButtonProps) => {
  const heartClass = isLiked
    ? "text-red-500 fill-red-500"
    : "text-red-500 hover:fill-red-500";

  const toggleLikeReviewWithMovieId = toggleLikeReview.bind(null, id);

  const formAction =
    type === "movie" ? toggleLikeMovie : toggleLikeReviewWithMovieId;

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name={type === "movie" ? "movieId" : "reviewId"}
        value={id}
      />
      <button type="submit">
        <Heart size={size} className={cn([heartClass, className])} />
      </button>
    </form>
  );
};
