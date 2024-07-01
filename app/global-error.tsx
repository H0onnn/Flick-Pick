"use client";

import { ShieldAlert } from "lucide-react";
import { Flex, Button } from "./shared/components";

export default function GlobalError(props: {
  error: unknown;
  reset: () => void;
}) {
  <html>
    <body>
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="w-full h-dvh space-y-2"
      >
        <ShieldAlert size={128} />

        <h2>페이지를 불러오던 중 에러가 발생했습니다.</h2>

        <Button size="sm" onClick={() => props.reset()}>
          다시 시도하기
        </Button>
      </Flex>
    </body>
  </html>;
}
