import Link from "next/link";
import Image from "next/image";
import IMAGES from "@/app/public/images";

import { Flex } from "../ui";

export const Footer = () => {
  return (
    <footer className="bg-[#373A40] text-gray-400 label3 p-5 fiexd bottom-0">
      <Flex justify="between" className="flex-col sm:flex-row gap-4">
        <Flex direction="column" className="gap-1">
          <Flex align="center" className="gap-2 pb-2">
            <p>Made by JeongHun</p>

            <Link
              href="https://github.com/H0onnn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={IMAGES.GIT_LOGO} alt="github" className="w-6 h-6" />
            </Link>

            <Link
              href="https://velog.io/@hoonnn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={IMAGES.VELOG_LOGO}
                alt="velog"
                className="w-6 h-6 rounded-full"
              />
            </Link>

            <Link
              href="mailto:dukei201248@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={IMAGES.GMAIL_LOGO} alt="gmail" className="w-6 h-6" />
            </Link>
          </Flex>

          <p className="pt-3">
            해당 사이트는 포트폴리오 목적으로 제작되었습니다.
          </p>
          <p>© 2024. All rights reserved.</p>
        </Flex>

        <Flex direction="column">
          <p className="sm:text-right sm:pb-2">Used APIs</p>

          <Flex className="gap-4">
            <Image
              src={IMAGES.YOUTUBE_LOGO}
              alt="youtube_logo"
              className="w-[50px] h-[30px] sm:h-[55px]"
            />

            <Image
              src={IMAGES.TMDB_LOGO}
              alt="tmdb_logo"
              className="w-[50px] h-[30px] sm:w-[100px] sm:h-[55px]"
            />
          </Flex>
        </Flex>
      </Flex>
    </footer>
  );
};
