import { ArrowBigLeft, Ghost } from "lucide-react";
import { useErrorBoundary } from "../../hooks";
import { CountdownMessage } from "../CountdownMessage";

export function ErrorPage404() {
  const { navigate, cancelRedirect, countdown } = useErrorBoundary();

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
