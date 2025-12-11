import DataTableColumnHeader from "@/shared/kit/DataTable/DataTableColumnHeader";
import DataTableColumnHeaderMultiSort from "@/shared/kit/DataTable/DataTableColumnHeaderMultiSort";
import { formateDate } from "@/shared/helpers/formateDate";
import type { GetResponseAllCartridgeInWarehouseDtoSchema } from "@api/gen";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetResponseAllCartridgeInWarehouseDtoSchema>[] =
  [
    {
      id: "Модель",
      accessorKey: "model.name",
      header: ({ column }) => {
        return (
          <DataTableColumnHeaderMultiSort column={column} title="Модель" />
        );
      },
      sortingFn: "text",
      enableMultiSort: true,
    },
    {
      id: "Состояние",
      accessorKey: "state",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Состояние" />;
      },
      sortingFn: "text",
      filterFn: (row, id, value: string[]) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "Склад",
      accessorKey: "warehouse.name",
      header: ({ column }) => {
        return <DataTableColumnHeaderMultiSort column={column} title="Склад" />;
      },
      sortingFn: "text",
    },
    {
      id: "Поступление",
      accessorKey: "createdAt",
      accessorFn: (row) => new Date(row.createdAt),
      header: ({ column }) => {
        return (
          <DataTableColumnHeaderMultiSort column={column} title="Поступление" />
        );
      },
      sortingFn: "datetime",
      enableMultiSort: true,
      cell: (props) => {
        return <span>{formateDate(props.row.original.createdAt)}</span>;
      },
    },
    {
      id: "Действия",
      //Позже буду в компонент передать row
      cell: () => {
        return <div></div>;
      },
    },
  ];
