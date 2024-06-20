import { cn } from "@/app/shared/utils";
import { Heart } from "lucide-react";
import { toggleLikeMovie } from "@/app/features/movie/queries";
import { toggleLikeReview } from "@/app/features/review/queries";

interface LikeButtonProps {
  id: string;
  movieId?: string;
  isLiked: boolean;
  type: "movie" | "review";
  size?: number;
  className?: string;
}

export const LikeButton = async ({
  id,
  movieId,
  type,
  isLiked,
  size = 34,
  className,
}: LikeButtonProps) => {
  const heartClass = isLiked
    ? "text-red-500 fill-red-500"
    : "text-red-500 hover:fill-red-500";

  const formAction = type === "movie" ? toggleLikeMovie : toggleLikeReview;

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name={type === "movie" ? "movieId" : "reviewId"}
        value={id}
      />
      {type === "review" && (
        <input type="hidden" name="movieId" value={movieId} />
      )}
      <button type="submit">
        <Heart size={size} className={cn([heartClass, className])} />
      </button>
    </form>
  );
};
