"use client";

import { useDialog } from "@/app/shared/hooks";

import { withraw } from "../apis";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from "@/app/shared/components";

export const WithrawDialog = () => {
  const { onClose, isOpen } = useDialog();

  return (
    <Dialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>정말 탈퇴하시겠어요?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          탈퇴 후 데이터는 복구할 수 없습니다.
          <br />
          정말 탈퇴하시겠어요?
        </DialogDescription>
        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" size="sm" onClick={withraw}>
            탈퇴
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
