import LOGO from "./flick-pick-logo.png";

const IMAGES = {
  LOGO,
} as const;

export type ImageType = keyof typeof IMAGES;
export default IMAGES;
