"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { Textarea, Button, Flex, StarRating } from "@/app/shared/components";
import { ReviewActionButtons } from "./review-action-buttons";

import { PostReviewDto } from "@/app/features/review/models";
import {
  RATING_COMMENT,
  RatingCommentType,
} from "@/app/features/review/constants";

import {
  postReview,
  updateReview,
  getMyReviewByMovie,
} from "@/app/features/review/queries/actions";

// TODO: useOptimistic, useTransition & textarea, button disabled

export const ReviewForm = () => {
  const params = useParams<{ id: string }>();
  const { data: session, status } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<PostReviewDto>({
    rating: 0,
    comment: "",
    userId: "",
    movieId: params.id,
  });

  useEffect(() => {
    if (status === "unauthenticated") return;

    const fetchMyReview = async () => {
      if (status === "authenticated") {
        const review = await getMyReviewByMovie(params.id);
        if (review) {
          setFormValues({
            rating: review.rating,
            comment: review.comment,
            userId: review.userId,
            movieId: review.movieId,
          });
        }
      }
    };

    fetchMyReview();
  }, [params.id, status]);

  const handleSubmit = async () => {
    if (isEditing) {
      try {
        await updateReview(formValues);
        toast.success("리뷰가 수정되었어요 :)");
        setIsEditing(false);
        return;
      } catch (e) {
        if (e instanceof Error) {
          toast.error("리뷰 수정 중 오류가 발생했어요 :(", {
            description: e.message,
          });
        }
      }
    }

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
            {RATING_COMMENT[formValues.rating as RatingCommentType]}
          </p>
          <StarRating
            rating={formValues.rating}
            onChange={
              status === "authenticated"
                ? (rating) => setFormValues({ ...formValues, rating })
                : undefined
            }
          />
        </Flex>

        <Flex direction="column" className="w-full gap-3">
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
            disabled={status === "unauthenticated"}
          />

          <Flex align="center" justify="between" className="gap-3 w-full">
            {status === "authenticated" && (
              <p className="label3 -mt-6">{formValues.comment.length}/500</p>
            )}
            <Flex align="center" className={isEditing ? "gap-3" : "gap-6"}>
              {isEditing ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-12"
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </Button>
              ) : (
                <ReviewActionButtons
                  isEditing={isEditing}
                  onEdit={setIsEditing}
                />
              )}
              <Button
                type="submit"
                size="sm"
                disabled={
                  status === "unauthenticated" ||
                  !formValues.rating ||
                  !formValues.comment
                }
                className="w-12"
              >
                등록
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
