import { ArrowDown, ArrowUp, ArrowUpDown, EyeOff } from "lucide-react";
import { Button } from "../ui/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

export default function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {title}
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ArrowUpDown />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Сортировка</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => column.toggleSorting(false)}
          className="cursor-pointer"
        >
          <ArrowUp />
          Возр
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => column.toggleSorting(true)}
          className="cursor-pointer"
        >
          <ArrowDown />
          Убыв
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          key={column.id}
          defaultValue={column.id}
          onClick={(defaultValue) => column.toggleVisibility(!defaultValue)}
          className="cursor-pointer"
        >
          <EyeOff />
          Скрыть
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
