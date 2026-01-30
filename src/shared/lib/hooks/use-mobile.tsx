import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем ширину экрана (обычно 768px для мобильных)
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Проверяем сразу при монтировании
    checkIsMobile();

    // Добавляем слушатель изменения размера
    window.addEventListener("resize", checkIsMobile);

    // Убираем слушатель при размонтировании
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return isMobile;
}
