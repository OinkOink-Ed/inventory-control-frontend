import { GetResponseDetailedStaffByIdSchema } from "@/app/api/generated";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
// import DataTableRowActions from "@/components/DataTable/DataTableRowActions";
// import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
// import { Link } from "react-router";

export const columns: ColumnDef<GetResponseDetailedStaffByIdSchema>[] = [
  {
    id: "Модель",
    accessorFn: (row) =>
      `${row.acceptedCartridge}`,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Модель" />;
    },
    sortingFn: "text",
  },
  //   id: "Действия",
  //   //Позже буду в компонент передать row
  //   cell: (row) => {
  //     return (
  //       <DataTableRowActions
  //         linkToCard={
  //           <DropdownMenuItem>
  //             <Link to={`/staff/${row.row.original.id}`}>
  //               Перейти в карточку
  //             </Link>
  //           </DropdownMenuItem>
  //         }
  //       />
  //     );
  //   },
  // },
];
