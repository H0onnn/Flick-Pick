import { NextPage } from "next";
import { Dog } from "lucide-react";
import Link from "next/link";
import { Flex, Button } from "./shared/components";

const NotFound: NextPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="w-full h-dvh"
    >
      <Dog size={128} />

      <p>페이지를 찾을 수 없습니다!</p>

      <Button variant="link" size="sm" className="mt-4" asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </Flex>
  );
};

export default NotFound;
