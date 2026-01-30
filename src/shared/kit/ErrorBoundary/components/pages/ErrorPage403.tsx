import { CountdownMessage } from "@/kit/ErrorBoundary/components/CountdownMessage.tsx";
import { useErrorBoundary } from "@/kit/ErrorBoundary/hooks/useErrorBoundary.tsx";
import { ArrowBigLeft, Ban } from "lucide-react";

export function ErrorPage403() {
  const { navigate, cancelRedirect, countdown } = useErrorBoundary();

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
