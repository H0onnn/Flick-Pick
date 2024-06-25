"use client";

import { cn } from "../../utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Flex, Button } from "../ui";

export const ThemeSelectButtons = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Flex align="center" className="space-x-2">
      <Button
        variant="outline"
        className={cn(
          "space-x-2 flex-1",
          theme === "light" ? "bg-black text-white" : "bg-white text-black",
        )}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90" />
        <span>밝게</span>
      </Button>

      <Button
        variant="outline"
        className="space-x-2 flex-1"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4 transition-all dark:rotate-0 dark:scale-100" />
        <span>어둡게</span>
      </Button>
    </Flex>
  );
};
