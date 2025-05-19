import { GetResponseAllStaffDtoSchema } from "@/app/api/generated";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import DataTableRowActions from "@/components/DataTable/DataTableRowActions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetResponseAllStaffDtoSchema>[] = [
  {
    id: "ФИО",
    accessorFn: (row) => `${row.lastname} ${row.name} ${row.patronimyc}`,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ФИО" />;
    },
    sortingFn: "text",
  },
  {
    id: "Действия",
    //Позже буду в компонент передать row
    cell: () => {
      return <DataTableRowActions />;
    },
  },
];
