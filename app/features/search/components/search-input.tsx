"use client";

import { useState } from "react";

import { Input } from "@/app/shared/components";
import { Search } from "lucide-react";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Input
      placeholder="영화를 검색해보세요."
      leftSlot={<Search size={20} />}
      isResetButton={true}
      value={searchValue}
      onChange={(value) => setSearchValue(value)}
      className="w-full min-w-72 bg-gray-100 sm-max:hidden"
    />
  );
};
