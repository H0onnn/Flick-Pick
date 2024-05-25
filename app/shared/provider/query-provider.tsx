"use client";

import { useState } from "react";
import {
  QueryClientProvider as QueryClientProviderPrimitive,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryClientPovider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 60 * 1000,
        },
      },
    }),
  );

  return (
    <QueryClientProviderPrimitive client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderPrimitive>
  );
}
