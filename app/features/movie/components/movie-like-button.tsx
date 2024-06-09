import { cn } from "@/app/shared/lib/utils";
import { Heart } from "lucide-react";
import { isLikedMovie, toggleLikeMovie } from "@/app/features/movie/queries";

interface MovieLikeButtonProps {
  className?: string;
  movieId: string;
}

export const MovieLikeButton = async ({
  className,
  movieId,
}: MovieLikeButtonProps) => {
  const isLiked = await isLikedMovie(movieId);

  const heartClass = isLiked
    ? "text-red-500 fill-red-500"
    : "text-red-500 hover:fill-red-500";

  return (
    <form action={toggleLikeMovie}>
      <input type="hidden" name="movieId" value={movieId} />
      <button type="submit">
        <Heart size={34} className={cn([heartClass, className])} />
      </button>
    </form>
  );
};
