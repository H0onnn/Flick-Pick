export const RATING_COMMENT = {
  0.0: "별점을 남겨주세요",
  0.5: "다시는 만나지 말자",
  1.0: "앗.. 이건 아닌데..",
  1.5: "별로에요 :(",
  2.0: "아쉬워요",
  2.5: "그저 그래요",
  3.0: "볼만해요",
  3.5: "꽤 재밌어요",
  4.0: "추천해요!",
  4.5: "취향 저격 탕탕!",
  5.0: "설명이 필요 없는 갓띵작",
} as const;

export type RatingCommentType = keyof typeof RATING_COMMENT;
