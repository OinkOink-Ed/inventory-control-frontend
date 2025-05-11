import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

//Улучшить для выбора действия и их работы
export default function DataTableRowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuItem>Дейсвтие 1</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Дейсвтие 2</DropdownMenuItem>
        <DropdownMenuItem>Дейсвтие 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
