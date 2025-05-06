import { UserForm } from "../pages/users/UserForm";
import { UsersTable } from "../pages/users/UsersTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button/Button";

export default function UsersLayout() {
  return (
    <div className="flex h-svh w-full flex-grow flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 mt-4">Создать пользователя</Button>
        </DialogTrigger>
        <DialogContent className="flex h-4/6 min-w-[900px] flex-col">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              Создать пользователя
            </DialogTitle>
            <DialogDescription className="flex justify-center">
              Заполните требуемые поля
            </DialogDescription>
          </DialogHeader>
          <UserForm />
        </DialogContent>
      </Dialog>
      <UsersTable />
    </div>
  );
}
