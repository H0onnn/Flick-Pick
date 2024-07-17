"use client";

import { useOptimistic } from "react";
import { cn } from "@/app/shared/utils";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  id: string;
  action: (formData: FormData) => Promise<void>; // eslint-disable-line
  isLiked: boolean;
  size?: number;
  className?: string;
}

export const LikeButton = ({
  id,
  action,
  isLiked,
  size = 34,
  className,
}: LikeButtonProps) => {
  const [optimisticLiked, toggleOptimistic] = useOptimistic(
    isLiked,
    (state) => {
      return !state;
    },
  );

  const heartClass = optimisticLiked
    ? "text-red-500 fill-red-500"
    : "text-red-500 hover:fill-red-500";

  return (
    <form
      action={async (formData) => {
        const id = formData.get("id") as string;

        toggleOptimistic(id);
        await action(formData);
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit">
        <Heart size={size} className={cn([heartClass, className])} />
      </button>
    </form>
  );
};
