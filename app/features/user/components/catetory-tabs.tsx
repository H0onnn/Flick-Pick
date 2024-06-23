"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Flex, TabButton } from "@/app/shared/components";

export const CategoryTabs = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [isSelected, setIsSelected] = useState({
    review: true,
    wishlist: false,
    comment: false,
  });

  const handleSelect = (key: string) => {
    setIsSelected({
      review: false,
      wishlist: false,
      comment: false,
      [key]: true,
    });

    router.push(`/user/info/${params.id}?category=${key}`);
  };

  return (
    <Flex className="w-[200px]">
      <TabButton
        active={isSelected.review}
        onClick={() => handleSelect("review")}
      >
        리뷰
      </TabButton>

      <TabButton
        active={isSelected.wishlist}
        onClick={() => handleSelect("wishlist")}
      >
        찜
      </TabButton>

      <TabButton
        active={isSelected.comment}
        onClick={() => handleSelect("comment")}
      >
        댓글
      </TabButton>
    </Flex>
  );
};
