"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { DetailReviewList } from "./detail-review-list";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@/app/shared/components/ui";
import { ReviewCardSkeleton } from "./review-card-skeleton";

import { fetchAPI } from "@/app/shared/apis";
import { GetAllReviewsProps } from "../apis/get-all-reviews-by-movie";

interface DetailReviewDialogProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailReviewDialog = ({
  isOpen,
  onClose,
}: DetailReviewDialogProps) => {
  const params = useParams<{ id: string }>();

  const [reviews, setReviews] = useState<GetAllReviewsProps[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchReviews = async () => {
        setIsFetching(true);
        const response = await fetchAPI.get(`/api/reviews/${params.id}`);

        setReviews(response.reviews);
        setIsFetching(false);
      };

      fetchReviews();
    }
  }, [isOpen, params.id]);

  return (
    <Dialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>사용자 코멘트</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          총 <span className="font-bold text-black">{reviews.length}개</span>의
          코멘트가 있습니다.
        </DialogDescription>

        {isFetching ? (
          <Flex direction="column" className="gap-4">
            {Array.from({ length: reviews.length }).map((_, index) => (
              <ReviewCardSkeleton key={index} />
            ))}
          </Flex>
        ) : (
          <DetailReviewList reviews={reviews} />
        )}
      </DialogContent>
    </Dialog>
  );
};
