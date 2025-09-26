export const formatPhoneNumber = (value: string | undefined): string => {
  if (!value) return "+7 ";

  // Удаляем все нецифровые символы кроме +
  const cleaned = value.replace(/[^\d+]/g, "");

  // Если номер начинается не с +7, добавляем +7
  if (!cleaned.startsWith("+")) {
    return "+7 ";
  }

  // Применяем маску вручную
  let formatted = "+7";
  const digits = cleaned.slice(2).replace(/\D/g, "");

  if (digits.length > 0) {
    formatted += " " + digits.slice(0, 3);
  }
  if (digits.length > 3) {
    formatted += " " + digits.slice(3, 6);
  }
  if (digits.length > 6) {
    formatted += "-" + digits.slice(6, 8);
  }
  if (digits.length > 8) {
    formatted += "-" + digits.slice(8, 10);
  }

  return formatted;
};
