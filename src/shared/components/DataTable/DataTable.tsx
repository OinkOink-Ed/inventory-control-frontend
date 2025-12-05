import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { type PropsWithChildren, useState } from "react";
import DataTableToolbar from "@/components/DataTable/DataTableToolbar";
import DataTableFooter from "@/components/DataTable/DataTableFooter";
import { DataTableProvider } from "@/components/DataTable/providers/DataTableProvider";
import { ToolbarActions } from "./ToolbarActions";

interface DataTableProps<TData, TValue> extends PropsWithChildren {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  titleTable: string;
  defaultSort: string;
  column?: string;
  facetedOptions?: {
    columnName: string;
    options: {
      label: string;
      value: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  pageSize: number;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  titleTable,
  defaultSort,
  column,
  facetedOptions,
  pageSize,
  children,
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

  // eslint-disable-next-line react-hooks/incompatible-library
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
        pageSize: pageSize,
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
    <DataTableProvider>
      <div className="m-2 flex grow flex-col border px-6 pt-6">
        <div className="mb-6 flex justify-center">
          <h1 className="">{titleTable}</h1>
        </div>

        <DataTableToolbar
          column={column}
          facetedOptions={facetedOptions}
          table={table}
        />

        <div className="felx-col flex min-h-0 flex-1 border-t">
          <Table className="border">
            <TableHeader className="sticky top-0 z-50 bg-white shadow-sm">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                  className="odd:bg-gray-200 dark:odd:bg-gray-900"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DataTableFooter table={table} />
      </div>
      {children}
    </DataTableProvider>
  );
}

DataTable.ToolbarActions = ToolbarActions;
