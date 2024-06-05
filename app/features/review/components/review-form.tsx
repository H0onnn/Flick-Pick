"use client";

import { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { toast } from "sonner";
import { Textarea, Button, Flex, StarRating } from "@/app/shared/components";
import { ReviewActionButtons } from "./review-action-buttons";
import { Loader2 } from "lucide-react";

import { PostReviewDto, Review } from "@/app/features/review/models";
import {
  RATING_COMMENT,
  RatingCommentType,
} from "@/app/features/review/constants";

import {
  postReview,
  updateReview,
} from "@/app/features/review/queries/actions";

export const ReviewForm = ({ initialReview }: { initialReview: Review }) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isPending, startTransition] = useTransition();

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<PostReviewDto>({
    userId: "",
    movieId: params.id,
    rating: initialReview?.rating ?? 0,
    comment: initialReview?.comment ?? "",
  });

  const handleSubmit = async () => {
    if (
      initialReview &&
      formValues.rating === initialReview.rating &&
      formValues.comment === initialReview.comment
    ) {
      isEditing && setIsEditing(false);
      return;
    }

    startTransition(async () => {
      if (isEditing) {
        try {
          await updateReview(formValues);
          toast.success("리뷰가 수정되었어요 :)");
          router.refresh();
          setIsEditing(false);
        } catch (e) {
          if (e instanceof Error) {
            toast.error("리뷰 수정 중 오류가 발생했어요 :(", {
              description: e.message,
            });
          }
        }
      } else {
        try {
          await postReview(formValues);
          toast.success("리뷰가 등록되었어요 :)");
          router.refresh();
        } catch (e) {
          if (e instanceof Error) {
            toast.error("리뷰 작성 중 오류가 발생했어요 :(", {
              description: e.message,
            });
          }
        }
      }
    });
  };

  const handleEditCancel = () => {
    if (initialReview) {
      setFormValues({
        ...formValues,
        rating: initialReview.rating,
        comment: initialReview.comment,
      });
      setIsEditing(false);
    }

    setIsEditing(false);
  };

  return (
    <Flex align="center" className="gap-8 w-full" asChild>
      <form onSubmit={handleSubmit}>
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
            disabled={
              status === "unauthenticated" ||
              (status === "authenticated" && !!initialReview && !isEditing)
            }
          />

          <Flex align="center" justify="between" className="gap-3 w-full">
            <p className="label3 -mt-6">
              {status === "authenticated"
                ? `${formValues.comment.length}/500`
                : ""}
            </p>

            <Flex align="center" className={isEditing ? "gap-3" : "gap-6"}>
              {isEditing ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-12"
                  onClick={handleEditCancel}
                >
                  취소
                </Button>
              ) : (
                !!initialReview && (
                  <ReviewActionButtons
                    isEditing={isEditing}
                    onEdit={setIsEditing}
                    onDelete={setFormValues}
                  />
                )
              )}
              <Button
                type="submit"
                size="sm"
                disabled={
                  status === "unauthenticated" ||
                  !formValues.rating ||
                  !formValues.comment ||
                  isPending
                }
                className="w-12"
              >
                {isPending ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  "등록"
                )}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};
