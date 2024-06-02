import KAKAO from "./kakao.svg";

const ICONS = {
  KAKAO,
} as const;

export type IconType = keyof typeof ICONS;
export default ICONS;
