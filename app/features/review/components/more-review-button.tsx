"use client";

import { useState } from "react";

import { Button } from "@/app/shared/components/ui";
import { DetailReviewDialog } from "./detail-review-dialog";

export const MoreReviewButton = () => {
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

      <DetailReviewDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
