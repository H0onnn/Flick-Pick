"use client";

import Link from "next/link";

import { useState } from "react";
import { useDebounce } from "@/app/shared/hooks";
import { useSearchMovie } from "../hooks";

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

import { Check, Search, LoaderCircleIcon, Frown } from "lucide-react";

export const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue);
  const { isLoading, movies } = useSearchMovie({
    searchQuery: debouncedSearchValue,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-72 hidden lg:flex"
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
        <Command>
          <CommandInput
            placeholder="영화를 검색해보세요."
            onValueChange={(currentValue) => setSearchValue(currentValue)}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? (
                <LoaderCircleIcon
                  size={24}
                  className="text-gray-500 animate-spin"
                />
              ) : (
                <Flex align="center" justify="center" className="gap-2">
                  <Frown size={18} />
                  검색된 작품이 없어요.
                </Flex>
              )}
            </CommandEmpty>
            <CommandGroup>
              {movies?.map((movie) => (
                <Link key={movie.id} href={`/movie/${movie.id}`}>
                  <CommandItem
                    value={movie.title}
                    onSelect={(currentValue) => {
                      setSearchValue(
                        currentValue === searchValue ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        searchValue === movie.title
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {movie.title}
                  </CommandItem>
                </Link>
              ))}
              {isLoading && (
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
