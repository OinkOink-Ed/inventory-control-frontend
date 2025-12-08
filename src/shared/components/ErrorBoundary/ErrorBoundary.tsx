import { CustomErrorForbidden } from "@/lib/errors/CustomErrorForbidden";
import { isRouteErrorResponse } from "react-router";
import { ErrorPage403, ErrorPage404, ErrorPageAny } from "./components";
import { useErrorBoundary } from "./hooks";

export function ErrorBoundary() {
  const { error } = useErrorBoundary();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <ErrorPage404 />;
  }

  if (error instanceof CustomErrorForbidden && error.status === 403)
    return <ErrorPage403 />;

  return <ErrorPageAny />;
}
