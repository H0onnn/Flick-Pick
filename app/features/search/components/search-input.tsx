"use client";

import { useState } from "react";
import { useScroll } from "@/app/shared/hooks";

import { Input } from "@/app/shared/components";
import { Search } from "lucide-react";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isScrolled } = useScroll();

  return (
    <Input
      size="sm"
      placeholder="영화를 검색해보세요."
      leftSlot={<Search size={20} className="text-gray-300" />}
      isResetButton={true}
      value={searchValue}
      onChange={(value) => setSearchValue(value)}
      className={`w-full min-w-72 sm-max:hidden ${isScrolled ? "bg-gray-100" : "bg-transparent"}`}
      inputClassName={isScrolled ? "placeholder:text-gray-400" : ""}
    />
  );
};
