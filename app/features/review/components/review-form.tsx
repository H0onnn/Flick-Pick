"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Textarea, Button, Flex, StarRating } from "@/app/shared/components";
import { toast } from "sonner";
import { PostReviewDto } from "../models";
import { RATING_COMMENT } from "../constants";
import { postReview } from "../queries";

export const ReviewForm = () => {
  const params = useParams<{ id: string }>();
  const { data: session, status } = useSession();

  const [formValues, setFormValues] = useState<PostReviewDto>({
    rating: 0,
    comment: "",
    userId: "",
    movieId: params.id,
  });

  const handleSubmit = async () => {
    try {
      await postReview(formValues);
      toast.success("리뷰가 성공적으로 작성되었어요 :)");
    } catch (e) {
      if (e instanceof Error) {
        toast.error("리뷰 작성 중 오류가 발생했어요 :(", {
          description: e.message,
        });
      }
    }
  };

  return (
    <Flex align="center" className="gap-8 w-full" asChild>
      <form action={handleSubmit}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="gap-2"
        >
          <p className="head6b">나의 별점</p>
          <p className="head4b">{formValues.rating}</p>
          <p className="label3">
            {RATING_COMMENT[formValues.rating as keyof typeof RATING_COMMENT]}
          </p>
          <StarRating
            rating={formValues.rating}
            onChange={(value) =>
              setFormValues({ ...formValues, rating: value })
            }
          />
        </Flex>

        <Flex direction="column" align="end" className="w-full gap-3">
          <Textarea
            placeholder={
              status === "authenticated"
                ? `작품에 대한 ${session?.user?.name}님의 평가를 남겨보세요!`
                : "로그인 후 작품에 대한 평가를 남겨보세요!"
            }
            value={formValues.comment}
            onChange={(e) =>
              setFormValues({ ...formValues, comment: e.target.value })
            }
            maxLength={500}
          />

          <Flex align="center" className="gap-3">
            {status === "authenticated" && (
              <p>{formValues.comment.length}/500</p>
            )}
            <Button
              type="submit"
              disabled={
                formValues.comment.length === 0 || status !== "authenticated"
              }
              className="w-16"
            >
              코멘트
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
