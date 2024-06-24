"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchMovie } from "@/app/features/search/hooks";
import { useDebounce } from "@/app/shared/hooks";
import { cn } from "@/app/shared/utils";
import { ChevronLeft, Frown, Search } from "lucide-react";
import {
  Flex,
  PageLayout,
  Input,
  NonDataFallback,
} from "@/app/shared/components";
import { MovieCard } from "@/app/features/movie/components";

interface RecentSearchProps {
  id: number;
  value: string;
}

export default function Page() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue);
  const { isLoading, movies } = useSearchMovie({
    searchQuery: debouncedSearchValue,
  });

  return (
    <PageLayout
      header={
        <Flex align="center" className="space-x-3 py-4">
          <ChevronLeft size={32} role="button" onClick={() => router.back()} />
          <Input
            variant="box"
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            leftSlot={<Search />}
            isResetButton={true}
            placeholder="나의 최애 영화찾기"
            inputClassName="placeholder:text-primary"
          />
        </Flex>
      }
      isPaddingTop={false}
    >
      <section className="border-t border-solid border-border pt-4">
        <p className="head6sb pb-4">
          {movies.length ? `검색결과 ${movies.length}개` : "검색결과"}
        </p>

        {movies.length === 0 && !isLoading ? (
          <Flex align="center" justify="center" className="h-screen">
            <NonDataFallback
              icon={<Frown size={72} className="text-gray-500" />}
              fallbackText="검색된 작품이 없어요."
            />
          </Flex>
        ) : (
          <Flex wrap="wrap" className="pt-4">
            {isLoading ? (
              <div>loading ...</div>
            ) : (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className={cn(
                    "mb-16 px-2 basis-1/2 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                    "w-[130px] h-[190px]",
                  )}
                >
                  <Link href={`/movie/${movie.id}`}>
                    <MovieCard
                      poster_path={movie.poster_path}
                      title={movie.title}
                      release_date={movie.release_date}
                      vote_average={Number(movie.vote_average.toFixed(1))}
                      type="default"
                    />
                  </Link>
                </div>
              ))
            )}
          </Flex>
        )}
      </section>
    </PageLayout>
  );
}
