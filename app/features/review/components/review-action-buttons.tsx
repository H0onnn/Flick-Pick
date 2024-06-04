"use client";

import { useDialog } from "@/app/shared/hooks";

import {
  Flex,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/components";
import { ReviewDeleteDialog } from "./review-delete-dialog";
import { PencilLine, Trash2, SquareArrowOutUpRight, X } from "lucide-react";

interface ReviewActionButtonsProps {
  isEditing: boolean;
  onEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReviewActionButtons = ({
  isEditing,
  onEdit,
}: ReviewActionButtonsProps) => {
  const { onOpen, isOpen } = useDialog();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Flex
            role="button"
            direction="column"
            align="center"
            className="gap-1 text-gray-400"
          >
            <SquareArrowOutUpRight size={24} />
          </Flex>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              role="button"
              onClick={() => onEdit?.((prev) => !prev)}
            >
              {isEditing ? (
                <X size={16} className="mr-2" />
              ) : (
                <PencilLine size={16} className="mr-2" />
              )}
              <span>{isEditing ? "취소" : "수정"}</span>
            </DropdownMenuItem>

            <DropdownMenuItem role="button" onClick={onOpen}>
              <Trash2 size={16} className="mr-2" />
              <span>삭제</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && <ReviewDeleteDialog />}
    </>
  );
};
