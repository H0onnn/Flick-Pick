import LOGO from "./flick-pick-logo.png";
import TMDB_LOGO from "./tmdb.svg";
import YOUTUBE_LOGO from "./Youtube.svg";
import GIT_LOGO from "./git.png";
import VELOG_LOGO from "./velog.png";
import GMAIL_LOGO from "./gmail.png";

const IMAGES = {
  LOGO,
  TMDB_LOGO,
  YOUTUBE_LOGO,
  GIT_LOGO,
  VELOG_LOGO,
  GMAIL_LOGO,
} as const;

export type ImageType = keyof typeof IMAGES;
export default IMAGES;
