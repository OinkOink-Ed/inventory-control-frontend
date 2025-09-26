import { Button } from "./ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { forwardRef, ReactNode } from "react";

interface DialogFormProps {
  buttonName: string;
  title: string;
  form: ReactNode;
}

const DialogForm = forwardRef<HTMLButtonElement, DialogFormProps>(
  ({ buttonName, title, form }, ref) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={ref} variant="outline" className="border-none">
            {buttonName}
          </Button>
        </DialogTrigger>
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
  },
);

export default DialogForm;
