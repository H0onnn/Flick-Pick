"use client";

import { useState } from "react";

import { Flex, Button, AsyncBoundary } from "@/app/shared/components";
import { DetailReviewDialog } from "./detail-review-dialog";
import { GetAllReviewsProps } from "../apis/get-all-reviews-by-movie";
import { ReviewCardSkeleton } from "./skeleton/review-card-skeleton";

interface MoreReviewButtonProps {
  reviews: Promise<GetAllReviewsProps[]>;
}

export const MoreReviewButton = ({ reviews }: MoreReviewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="submit"
        variant="link"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        더보기
      </Button>

      <AsyncBoundary
        loadingFallback={
          <Flex direction="column" className="gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))}
          </Flex>
        }
      >
        <DetailReviewDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          reviews={reviews}
        />
      </AsyncBoundary>
    </>
  );
};
