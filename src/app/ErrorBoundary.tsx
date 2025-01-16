import { isRouteErrorResponse, useRouteError } from "react-router";
import { CustomErrorForbidden } from "./Errors/CustomErrorForbidden";

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

  // Я не знаю самому генерировать ошибку, которая прошла бы проверку isRouteErrorResponse
  if (error instanceof CustomErrorForbidden && error.status === 403) {
    return (
      <div className="flex justify-start align-middle">
        У вас нет доступа к странице
      </div>
    );
  }

  return (
    <div className="flex justify-start align-middle">Произошла ошибка!</div>
  );
}
