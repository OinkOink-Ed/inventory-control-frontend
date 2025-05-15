import { Button } from "./ui/Button/Button";
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
  buttonName: string;
  title: string;
  form: ReactNode;
}

export default function DialogForm({
  buttonName,
  title,
  form,
}: DialogFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4 mt-4">
          {buttonName}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-4/6 min-w-[900px] flex-col">
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
