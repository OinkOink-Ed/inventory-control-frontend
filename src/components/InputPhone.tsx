import { useMaskito } from "@maskito/react";
import { Input } from "./ui/input";
import options from "../app/pages/users/mask";
import React from "react";

const InputPhone = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>((props: React.ComponentProps<"input">, ref) => {
  const maskedInputRef = useMaskito({ options });
  return <Input {...props} ref={maskedInputRef} />;
});

export { InputPhone };
