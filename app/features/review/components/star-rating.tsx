"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ICONS from "@/app/public/icons";
import { Flex } from "@/app/shared/components";

interface StarRatingProps {
  rating?: number;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number) => void;
  size?: number;
}

const starsArray = Array.from({ length: 5 });

const calculateStarValue = (
  index: number,
  e: React.MouseEvent<HTMLSpanElement>,
) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  return offsetX < rect.width / 2 ? index + 0.5 : index + 1;
};

export const StarRating = ({
  size = 32,
  onChange,
  rating: initialRating,
}: StarRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (initialRating === undefined) return;

    if (initialRating && initialRating > 0) {
      setRating(initialRating);
    } else {
      setRating(null);
    }
  }, [initialRating]);

  const updateStarRating = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  const handleStarClick = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>,
  ) => {
    if (onChange) {
      const selectedValue = calculateStarValue(index, e);
      updateStarRating(selectedValue);
    }
  };

  const handleMouseOver = (
    index: number,
    e: React.MouseEvent<HTMLSpanElement>,
  ) => {
    if (onChange) {
      const hoverValue = calculateStarValue(index, e);
      setHover(hoverValue);
    }
  };

  const renderStar = (index: number) => {
    const value = hover !== null ? hover : rating;

    if (value === null) {
      return (
        <Image
          src={ICONS.EMPTY_STAR}
          className="w-full h-full"
          alt="empty star"
        />
      );
    }

    const starType =
      value > index + 0.5 ? "full" : value > index ? "half" : "empty";

    const starIcons = {
      full: (
        <Image
          src={ICONS.FULL_STAR}
          className="w-full h-full"
          alt="full star"
        />
      ),
      half: (
        <Image
          src={ICONS.HALF_STAR}
          className="w-full h-full"
          alt="half star"
        />
      ),
      empty: (
        <Image
          src={ICONS.EMPTY_STAR}
          className="w-full h-full"
          alt="empty star"
        />
      ),
    };

    return starIcons[starType];
  };

  return (
    <Flex className="gap-1">
      {starsArray.map((_, index) => (
        <span
          key={index}
          style={{ width: size, height: size }}
          onClick={(e) => handleStarClick(index, e)}
          onMouseMove={(e) => handleMouseOver(index, e)}
          onMouseLeave={() => setHover(null)}
        >
          {renderStar(index)}
        </span>
      ))}
    </Flex>
  );
};
