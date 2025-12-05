import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { type ReactNode } from "react";
import { Button } from "../ui/button";

interface DataTableRowActionsProps {
  linkToCard: ReactNode;
}

//Улучшить для выбора действия и их работы (Пока что не трубется?)
export default function DataTableRowActions({
  linkToCard,
}: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        {linkToCard}
        <DropdownMenuSeparator />
        <DropdownMenuItem>Дейсвтие 2</DropdownMenuItem>
        <DropdownMenuItem>Дейсвтие 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
