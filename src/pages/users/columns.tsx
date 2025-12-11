import DataTableColumnHeader from "@/shared/kit/DataTable/DataTableColumnHeader";
import DataTableColumnHeaderMultiSort from "@/shared/kit/DataTable/DataTableColumnHeaderMultiSort";
import DataTableRowActions from "@/shared/kit/DataTable/DataTableRowActions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { GetResponseAllUserDtoSchema } from "@api/gen";
import { type ColumnDef } from "@tanstack/react-table";
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
    id: "Подразделения",
    accessorKey: "division",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Подразделения" />;
    },
    cell: ({ row }) => {
      const divisions: GetResponseAllUserDtoSchema["division"] =
        row.getValue("Подразделения");
      return (
        <div className="flex flex-col">
          {Array.isArray(divisions) &&
            divisions.map((division, index) => (
              <span key={division.id}>
                {division.name}
                {index < divisions.length - 1 ? ", " : ""}
              </span>
            ))}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const divisionsA: GetResponseAllUserDtoSchema["division"] =
        rowA.getValue(columnId);
      const divisionsB: GetResponseAllUserDtoSchema["division"] =
        rowB.getValue(columnId);

      const namesA = Array.isArray(divisionsA)
        ? divisionsA.map((d) => d.name).join(", ")
        : "";
      const namesB = Array.isArray(divisionsB)
        ? divisionsB.map((d) => d.name).join(", ")
        : "";

      return namesA.localeCompare(namesB);
    },
    filterFn: (row, id, value: string[]) => {
      const divisions: GetResponseAllUserDtoSchema["division"] =
        row.getValue(id);
      const divisionNames = Array.isArray(divisions)
        ? divisions.map((d) => d.name)
        : [];

      return divisionNames.some((name) => value.includes(name));
    },
  },
  {
    id: "Действия",
    cell: (row) => {
      return (
        <DataTableRowActions
          linkToCard={
            <DropdownMenuItem>
              <Link to={`/users/${String(row.row.original.id)}`}>
                Перейти в карточку
              </Link>
            </DropdownMenuItem>
          }
        />
      );
    },
  },
];
