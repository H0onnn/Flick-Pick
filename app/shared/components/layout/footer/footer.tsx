import Image from "next/image";
import IMAGES from "@/app/public/images";

import { Flex } from "../../ui";
import { SnsIcon } from "./sns-icon";

export const Footer = () => {
  return (
    <footer className="bg-[#373A40] text-gray-400 label3 p-5 fiexd bottom-0">
      <Flex justify="between" className="flex-col sm:flex-row gap-4">
        <Flex direction="column" className="gap-1">
          <Flex align="center" className="gap-2 pb-2">
            <p>Made by JeongHun</p>

            <SnsIcon
              trigger={
                <Image
                  src={IMAGES.GIT_LOGO}
                  alt="github"
                  className="w-6 h-6 rounded-full"
                />
              }
              icon={IMAGES.GIT_LOGO}
              title="GitHub"
              description="Visit my GitHub profile to see more projects"
              href="https://github.com/H0onnn"
            />

            <SnsIcon
              trigger={
                <Image
                  src={IMAGES.VELOG_LOGO}
                  alt="velog"
                  className="w-6 h-6 rounded-full"
                />
              }
              icon={IMAGES.VELOG_LOGO}
              title="Velog"
              description="Visit my Velog to see my articles"
              href="https://velog.io/@hoonnn"
            />

            <SnsIcon
              trigger={
                <Image
                  src={IMAGES.GMAIL_LOGO}
                  alt="gmail"
                  className="w-6 h-6 rounded-full"
                />
              }
              icon={IMAGES.GMAIL_LOGO}
              title="Gmail"
              description="Contact me via email"
              href="mailto:dukei201248@gmail.com"
            />
          </Flex>

          <p className="pt-3">
            해당 사이트는 포트폴리오 목적으로 제작되었습니다.
          </p>
          <p>© 2024. All rights reserved By JeongHun.</p>
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
