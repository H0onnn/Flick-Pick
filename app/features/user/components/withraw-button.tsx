"use client";

import { useDialog } from "@/app/shared/hooks";
import { Button } from "@/app/shared/components";
import { WithrawDialog } from "./withraw-dialog";

export const WithrawButton = () => {
  const { isOpen, onOpen } = useDialog();

  return (
    <>
      <Button type="button" variant="link" onClick={onOpen}>
        회원탈퇴
      </Button>

      {isOpen && <WithrawDialog />}
    </>
  );
};
