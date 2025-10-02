import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ReactNode } from "react";

interface DialogFormProps {
  title: string;
  form: ReactNode;
  openState: boolean;
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DialogForm({
  title,
  form,
  openState,
  changeState,
}: DialogFormProps) {
  return (
    <Dialog open={openState} onOpenChange={changeState}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex min-w-[900px] flex-col">
        <DialogHeader>
          <DialogTitle className="flex justify-center">{title}</DialogTitle>
          <DialogDescription className="flex justify-center">
            Заполните требуемые поля
          </DialogDescription>
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
}
