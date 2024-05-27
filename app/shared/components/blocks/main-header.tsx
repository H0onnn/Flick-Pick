"use client";

import { Header } from "..";
import { Flex, Button } from "@/app/shared/components";

export const MainHeader = () => {
  return (
    <Header
      leftSlot="LOGO"
      rightSlot={
        <Flex className="gap-2">
          <Button variant="outline">로그인</Button>
          <Button>회원가입</Button>
        </Flex>
      }
    >
      {null}
    </Header>
  );
};
