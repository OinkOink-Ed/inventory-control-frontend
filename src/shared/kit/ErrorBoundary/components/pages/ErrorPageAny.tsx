import { CountdownMessage } from "@/kit/ErrorBoundary/components/CountdownMessage.tsx";
import { useErrorBoundary } from "@/kit/ErrorBoundary/hooks/useErrorBoundary.tsx";
import { AlertCircle, ArrowBigLeft, RefreshCw } from "lucide-react";

export function ErrorPageAny() {
  const { navigate, cancelRedirect, countdown } = useErrorBoundary();

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
