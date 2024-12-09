import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex justify-start align-middle">
          Этой страницы не существует
        </div>
      );
    }
  }

  return (
    <div className="flex justify-start align-middle">Произошла ошибка!</div>
  );
}
