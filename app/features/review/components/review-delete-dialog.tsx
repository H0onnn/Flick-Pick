"use client";

import { useParams } from "next/navigation";
import { useDialog } from "@/app/shared/hooks";

import { toast } from "sonner";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/shared/components/ui";

import { deleteReview } from "@/app/features/review/queries/actions";
import { PostReviewDto } from "@/app/features/review/models";

interface ReviewDeleteDialogProps {
  onDelete: React.Dispatch<React.SetStateAction<PostReviewDto>>;
}

export const ReviewDeleteDialog = ({ onDelete }: ReviewDeleteDialogProps) => {
  const params = useParams<{ id: string }>();
  const { isOpen, onClose } = useDialog();

  const handleSubmit = async () => {
    try {
      await deleteReview(params.id);
      onDelete({
        userId: "",
        movieId: "",
        rating: 0,
        comment: "",
      });
      onClose();
      toast.success("리뷰가 삭제되었어요 :)");
    } catch (e) {
      if (e instanceof Error) {
        toast.error("리뷰 삭제 중 오류가 발생했어요 :(", {
          description: e.message,
        });
      }
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <form action={handleSubmit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>리뷰를 삭제하시겠어요?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            삭제한 리뷰는 복구할 수 없습니다.
            <br />
            정말 삭제하시겠어요?
          </DialogDescription>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              취소
            </Button>
            <Button type="submit" size="sm" onClick={handleSubmit}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
