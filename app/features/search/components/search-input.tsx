"use client";

import { useState } from "react";
import { useGetMoviesByQuery } from "../apis";
import { useDebounce, useObserver } from "@/app/shared/hooks";

import { cn } from "@/app/shared/utils";

import {
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/shared/components";

import { Check, Search, LoaderCircleIcon } from "lucide-react";

// TODO: truncate가 적용이 안되는 이슈, 반응형 검색창, 무한스크롤이 맛탱이 감

export const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);
  const { movies, isFetching, handleFetchNextPage } = useGetMoviesByQuery({
    value: debouncedSearchValue,
  });

  const pageRef = useObserver(() => handleFetchNextPage());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={true}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 sm-max:hidden"
        >
          {searchValue ? (
            <p className="w-full truncate">{searchValue}</p>
          ) : (
            <Flex align="center" className="gap-2 w-full">
              <Search />
              나의 최애 영화찾기
            </Flex>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 sm-max:hidden p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="영화를 검색해보세요."
            onValueChange={(currentValue) => setSearchValue(currentValue)}
          />
          <CommandList>
            <CommandEmpty>
              {isFetching ? (
                <LoaderCircleIcon
                  size={24}
                  className="text-gray-500 animate-spin"
                />
              ) : (
                `검색 결과가 없어요 :(`
              )}
            </CommandEmpty>
            <CommandGroup>
              {movies?.map((movie) => (
                <CommandItem
                  key={movie.id}
                  value={movie.title}
                  onSelect={(currentValue) => {
                    setSearchValue(
                      currentValue === searchValue ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                  className="w-full truncate"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      searchValue === movie.title ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {movie.title}
                </CommandItem>
              ))}
              <div ref={pageRef} className="h-px" />
              {isFetching && (
                <Flex align="center" justify="center">
                  <LoaderCircleIcon
                    size={24}
                    className="text-gray-500 animate-spin"
                  />
                </Flex>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
