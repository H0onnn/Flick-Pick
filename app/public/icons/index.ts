import KAKAO from "./kakao.svg";
import EMPTY_STAR from "./emptyStar.svg";
import FULL_STAR from "./fillStar.svg";
import HALF_STAR from "./halfStar.svg";

const ICONS = {
  KAKAO,
  EMPTY_STAR,
  FULL_STAR,
  HALF_STAR,
} as const;

export type IconType = keyof typeof ICONS;
export default ICONS;
