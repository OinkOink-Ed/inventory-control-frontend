import { useMaskito } from "@maskito/react";
import { Input } from "./ui/input";
import options from "../app/pages/users/mask";
import React from "react";

const InputPhone = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>((props, ref) => {
  const maskedInputRef = useMaskito({ options });

  // Функция для объединения refs
  const setRef = (el: HTMLInputElement | null) => {
    // Для react-hook-form ref
    if (typeof ref === "function") {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }

    // Для Maskito
    maskedInputRef(el);
  };

  return <Input {...props} ref={setRef} />;
});

InputPhone.displayName = "InputPhone";

export { InputPhone };
