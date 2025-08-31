import { GetResponseAllUserDtoSchema } from "@/app/api/generated";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import DataTableColumnHeaderMultiSort from "@/components/DataTable/DataTableColumnHeaderMultiSort";
import DataTableRowActions from "@/components/DataTable/DataTableRowActions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

export const columns: ColumnDef<GetResponseAllUserDtoSchema>[] = [
  {
    id: "Логин",
    accessorKey: "username",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Логин" />;
    },
    sortingFn: "text",
  },
  {
    id: "ФИО",
    accessorFn: (row) => `${row.lastname} ${row.name} ${row.patronimyc}`,
    header: ({ column }) => {
      return <DataTableColumnHeaderMultiSort column={column} title="ФИО" />;
    },
    sortingFn: "text",
    enableMultiSort: true,
  },
  {
    id: "Роль",
    accessorKey: "role.roleName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Роль" />;
    },
    sortingFn: "text",
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "Статус",
    accessorKey: "state",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Статус" />;
    },
    sortingFn: "text",
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "Подразделение",
    accessorKey: "division.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Подразделение" />;
    },
    sortingFn: "text",
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "Действия",
    //Позже буду в компонент передать row
    cell: (row) => {
      return (
        <DataTableRowActions
          linkToCard={
            <DropdownMenuItem>
              <Link to={`/users/${row.row.original.id}`}>
                Перейти в карточку
              </Link>
            </DropdownMenuItem>
          }
        />
      );
    },
  },
];
