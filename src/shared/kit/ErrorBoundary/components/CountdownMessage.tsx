import { X } from "lucide-react";

interface CountdownMessageProps {
  countdown: number;
  cancelRedirect: () => void;
}

export function CountdownMessage({
  cancelRedirect,
  countdown,
}: CountdownMessageProps) {
  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-sm opacity-80">
      <span>Автоматический переход через {countdown} сек.</span>
      <button
        onClick={cancelRedirect}
        className="flex items-center gap-1 rounded-full bg-black/10 px-2 py-1 text-xs hover:bg-black/20"
      >
        Отменить
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
