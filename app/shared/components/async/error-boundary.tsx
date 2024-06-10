"use client";

import React from "react";

type State = {
  shouldHandleError: boolean;
  shouldRethrow: boolean;
  error: Response | null;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      shouldHandleError: false,
      shouldRethrow: false,
      error: null,
    };
  }

  state: State = {
    shouldHandleError: false,
    shouldRethrow: false,
    error: null,
  };

  static getDerivedStateFromError(error: Response): State {
    if (error instanceof Response && !error.ok) {
      return {
        shouldHandleError: false,
        shouldRethrow: true,
        error,
      };
    }
    return {
      shouldHandleError: true,
      shouldRethrow: false,
      error,
    };
  }

  render() {
    if (this.state.shouldRethrow) {
      throw this.state.error;
    }
    if (!this.state.shouldHandleError) {
      return this.props.children;
    }
    if (
      this.state.error &&
      !this.state.error.ok &&
      this.state.error.status === 401
    ) {
      return <>인증 에러</>;
    }
    if (this.state.error && !this.state.error.ok) {
      return <>네트워크 에러</>;
    }
    return <>언노운 에러</>;
  }
}
