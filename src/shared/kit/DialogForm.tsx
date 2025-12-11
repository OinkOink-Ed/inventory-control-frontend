import { useDialogFormShow } from "@/shared/kit/store/dialogFormShow/useDialogFormShow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { type PropsWithChildren } from "react";
import type { DialogFormShowStore } from "@/shared/kit/store/dialogFormShow/type";
interface DialogFormProps extends PropsWithChildren {
  title: string;
  name: keyof DialogFormShowStore;
}

export function DialogForm({ title, name, children }: DialogFormProps) {
  const show = useDialogFormShow((state) => state[name]);
  const toggleShow = useDialogFormShow((state) => state.toggleDialogForm);

  return (
    <Dialog
      open={show}
      onOpenChange={() => {
        toggleShow(name);
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex min-w-[900px] flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-center">{title}</DialogTitle>
          <DialogDescription className="flex justify-center">
            Заполните требуемые поля
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
