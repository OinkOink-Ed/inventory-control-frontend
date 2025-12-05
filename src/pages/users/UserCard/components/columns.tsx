import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { type ColumnDef } from "@tanstack/react-table";
import { type GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";
import { formateDate } from "@/shared/helpers/formateDate";

export const columns: ColumnDef<GetResponseAcceptedCartridgeByUserDtoMySchema>[] =
  [
    {
      id: "Подразделение",
      accessorFn: (row) => row.division,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Подразделение" />;
      },
      sortingFn: "text",
    },
    {
      id: "Кабинет",
      accessorFn: (row) => row.kabinet,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Кабинет" />;
      },
      sortingFn: "alphanumeric",
    },
    {
      id: "Модель",
      accessorFn: (row) => row.model,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Модель" />;
      },
      sortingFn: "text",
    },
    {
      id: "Количество",
      accessorFn: (row) => row.count,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Количество" />;
      },
      sortingFn: "alphanumeric",
    },
    {
      id: "Дата получения",
      accessorFn: (row) => row.createdAt,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Дата получения" />;
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
        return <></>;
      },
    },
  ];
