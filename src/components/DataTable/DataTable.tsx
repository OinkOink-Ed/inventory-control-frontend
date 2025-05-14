import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import DataTableToolbar from "@/components/DataTable/DataTableToolbar";
import DataTableFooter from "@/components/DataTable/DataTableFooter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  titleTable: string;
  defaultSort: string;
  dialog?: ReactNode[];
  facetedOptions?: {
    columnName: string;
    options: {
      label: string;
      value: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
  titleTable,
  defaultSort,
  dialog,
  facetedOptions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: defaultSort,
      desc: false,
    },
  ]);
  const [globalFilter, setGlobalFilter] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      columnFilters,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 12, // Устанавливаем 20 строк на странице по умолчанию
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="m-2 flex flex-grow flex-col border p-6">
      <div className="mb-6 flex justify-center">
        <h1 className="">{titleTable}</h1>
      </div>
      <DataTableToolbar facetedOptions={facetedOptions} table={table} />
      <Table className="border">
        <TableHeader className="sticky -top-1 border bg-neutral-950">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="pl-6">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DataTableFooter table={table} dialog={[dialog]} />
    </div>
  );
}
