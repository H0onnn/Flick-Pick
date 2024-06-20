"use client";

import { Suspense, useState, useEffect } from "react";
import { useParams } from "next/navigation";

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
import { GetAllReviews, getReviewsByMovie } from "../apis";

interface DetailReviewDialogProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DetailReviewDialog = ({
  isOpen,
  onClose,
}: DetailReviewDialogProps) => {
  const params = useParams<{ id: string }>();

  const [reviews, setReviews] = useState<GetAllReviews[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchReviews = async () => {
        const response = await getReviewsByMovie(params.id);

        setReviews(response);
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

        <Suspense
          fallback={
            <Flex direction="column" className="gap-4">
              {Array.from({ length: reviews.length }).map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))}
            </Flex>
          }
        >
          <DetailReviewList reviews={reviews} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};
