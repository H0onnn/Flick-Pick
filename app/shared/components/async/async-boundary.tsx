import { Suspense } from "react";
import { ErrorBoundary } from "./error-boundary";

type AsyncBoundaryProps = {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
};

export const AsyncBoundary = ({
  children,
  loadingFallback,
}: AsyncBoundaryProps) => {
  return (
    <Suspense fallback={loadingFallback}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </Suspense>
  );
};
