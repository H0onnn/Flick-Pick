"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { getMoviesByQuery } from "../apis";
import { useDebounce } from "@/app/shared/hooks";

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
import { Movie } from "../../movie/models";

export const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    if (!debouncedSearchValue) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      const { results } = await getMoviesByQuery({
        query: debouncedSearchValue,
      });

      setMovies((prev) => [...prev, ...results]);
      setIsFetching(false);
    };

    setIsFetching(true);
    fetchMovies();
  }, [debouncedSearchValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
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
        <Command>
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
