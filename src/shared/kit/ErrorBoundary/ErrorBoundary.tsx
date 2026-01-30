import {
  ErrorPage403,
  ErrorPage404,
  ErrorPageAny,
} from "@/kit/ErrorBoundary/components/index.ts";
import { useErrorBoundary } from "@/kit/ErrorBoundary/hooks/useErrorBoundary.tsx";
import { CustomErrorForbidden } from "@/lib/errors/CustomErrorForbidden";
import { isRouteErrorResponse } from "react-router";

export function ErrorBoundary() {
  const { error } = useErrorBoundary();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <ErrorPage404 />;
  }

  if (error instanceof CustomErrorForbidden && error.status === 403)
    return <ErrorPage403 />;

  return <ErrorPageAny />;
}
