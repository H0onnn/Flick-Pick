"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/app/shared/components";

export const SignoutButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        await signOut({
          callbackUrl: "/",
        });
      }}
    >
      로그아웃
    </Button>
  );
};
