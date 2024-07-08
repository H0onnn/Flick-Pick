"use client";

import { use } from "react";

import { DetailReviewList } from "./detail-review-list";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/components/ui";
import { GetAllReviewsProps } from "../apis/get-all-reviews-by-movie";

interface DetailReviewDialogProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  reviews: Promise<GetAllReviewsProps[]>;
}

export const DetailReviewDialog = ({
  isOpen,
  onClose,
  reviews,
}: DetailReviewDialogProps) => {
  let allReviews: GetAllReviewsProps[] = [];
  if (isOpen) {
    allReviews = use(reviews);
  }

  return (
    <Dialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle>사용자 코멘트</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          총 <span className="font-bold text-black">{allReviews.length}개</span>
          의 코멘트가 있습니다.
        </DialogDescription>

        <DetailReviewList reviews={allReviews} />
      </DialogContent>
    </Dialog>
  );
};
