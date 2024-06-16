import LOGO from "./flick-pick-logo.png";
import TMDB_LOGO from "./tmdb.svg";
import YOUTUBE_LOGO from "./Youtube.png";

const IMAGES = {
  LOGO,
  TMDB_LOGO,
  YOUTUBE_LOGO,
} as const;

export type ImageType = keyof typeof IMAGES;
export default IMAGES;
