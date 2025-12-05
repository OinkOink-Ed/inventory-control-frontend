import { useMaskito } from "@maskito/react";
import { Input } from "./ui/input";
import React from "react";
import options from "@/pages/users/mask";

interface InputPhoneProps extends React.ComponentProps<"input"> {
  ref?: React.Ref<HTMLInputElement>;
}

const InputPhone = (props: InputPhoneProps) => {
  const maskedInputRef = useMaskito({ options });

  const { ref, ...restProps } = props;

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

  return <Input {...restProps} ref={setRef} />;
};

InputPhone.displayName = "InputPhone";

export { InputPhone };
