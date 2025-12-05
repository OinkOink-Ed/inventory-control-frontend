import { isRouteErrorResponse, useRouteError, useNavigate } from "react-router";
import { CustomErrorForbidden } from "../../shared/lib/errors/CustomErrorForbidden";
import { AlertCircle, ArrowBigLeft, Ban, Ghost, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { CountdownMessage } from "./CountdownMessage";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [redirectEnabled, setRedirectEnabled] = useState(true);

  useEffect(() => {
    if (!redirectEnabled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          void navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate, redirectEnabled]);

  const cancelRedirect = () => {
    setRedirectEnabled(false);
  };

  // Общий компонент для счетчика

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="flex h-svh w-full flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 rounded-full bg-white p-6 shadow-lg">
              <Ghost className="h-16 w-16 text-blue-500" />
            </div>
            <h1 className="mb-4 text-6xl font-bold text-blue-900">404</h1>
            <h2 className="mb-2 text-2xl font-semibold text-blue-800">
              Страница не найдена
            </h2>
            <p className="mb-6 max-w-md text-blue-600 opacity-80">
              Возможно, эта страница была перемещена или больше не существует
            </p>
            <button
              onClick={() => void navigate(-1)}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
            >
              <ArrowBigLeft className="h-5 w-5" />
              Назад
            </button>
            <CountdownMessage
              cancelRedirect={cancelRedirect}
              countdown={countdown}
            />
          </div>
        </div>
      );
    }
  }

  if (error instanceof CustomErrorForbidden && error.status === 403) {
    return (
      <div className="flex h-svh w-full flex-col items-center justify-center bg-linear-to-br from-amber-50 to-orange-100 px-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-white p-6 shadow-lg">
            <Ban className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="mb-4 text-6xl font-bold text-amber-900">403</h1>
          <h2 className="mb-2 text-2xl font-semibold text-amber-800">
            Доступ запрещен
          </h2>
          <p className="mb-6 max-w-md text-amber-600 opacity-80">
            У вас недостаточно прав для просмотра этой страницы
          </p>
          <button
            onClick={() => void navigate(-1)}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-white transition-colors hover:bg-amber-600"
          >
            <ArrowBigLeft className="h-5 w-5" />
            Назад
          </button>
          <CountdownMessage
            cancelRedirect={cancelRedirect}
            countdown={countdown}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center bg-linear-to-br from-red-50 to-pink-100 px-4">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-white p-6 shadow-lg">
          <AlertCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-red-900">Ошибка</h1>
        <h2 className="mb-2 text-2xl font-semibold text-red-800">
          Что-то пошло не так
        </h2>
        <p className="mb-6 max-w-md text-red-600 opacity-80">
          Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить
          страницу
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
          >
            <RefreshCw className="h-5 w-5" />
            Обновить
          </button>
          <button
            onClick={() => void navigate(-1)}
            className="flex items-center gap-2 rounded-lg bg-gray-500 px-6 py-3 text-white transition-colors hover:bg-gray-600"
          >
            <ArrowBigLeft className="h-5 w-5" />
            Назад
          </button>
        </div>
        <CountdownMessage
          cancelRedirect={cancelRedirect}
          countdown={countdown}
        />
      </div>
    </div>
  );
}
