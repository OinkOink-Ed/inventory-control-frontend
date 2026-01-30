import { X } from "lucide-react";
import { Input } from "@/ui/input";
import { type Table } from "@tanstack/react-table";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import DataTableView from "./DataTableView";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { useDataTableActions } from "./hooks/useDataTableActions";
import { Button } from "@/ui/button";

interface CountValues {
  name: string;
  value: number;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  column: string | undefined;
  facetedOptions?: {
    columnName: string;
    options: {
      label: string;
      value: string;
      icon: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}

export default function DataTableToolbar<TData>({
  table,
  facetedOptions,
  column,
}: DataTableToolbarProps<TData>) {
  const { toolbarActions } = useDataTableActions();
  const isFiltered = table.getState().columnFilters.length > 0;
  let unicValues;
  const result: CountValues[] = [];

  if (column) {
    unicValues = table
      .getColumn(column ? column : "")
      ?.getFacetedUniqueValues();

    unicValues?.forEach((count, key: string) => {
      result.push({ name: key, value: count });
    });
  }

  return (
    <div className="mb-4 flex gap-4">
      <div className="flex w-72">
        <Input
          name="tableFilter"
          placeholder="Поиск по таблице"
          value={String(table.getState().globalFilter)}
          onChange={(e) => {
            table.setGlobalFilter(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-4">
        {facetedOptions?.map((object) => {
          const column = table.getColumn(object.columnName);
          return (
            column &&
            table.getColumn(object.columnName) && (
              <DataTableFacetedFilter
                key={object.columnName}
                column={table.getColumn(object.columnName)}
                title={object.columnName}
                options={object.options}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="border-dashed"
          >
            Сбросить фильтр
            <X />
          </Button>
        )}
      </div>
      {toolbarActions}
      <div className="flex flex-1 justify-end gap-4">
        {column ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="self-center">
                Наличие по моделям
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-4/6 min-w-[900px] flex-col">
              <DialogHeader>
                <DialogTitle className="flex justify-center">
                  Количество картриджей по моделям
                  <DialogDescription className="flex justify-center"></DialogDescription>
                </DialogTitle>
              </DialogHeader>
              <div className="flex gap-4">
                {result.map((item) => (
                  <div key={item.name} className="self-center border-2 p-2">
                    {item.name} : {item.value} шт
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
      <div>
        <DataTableView table={table} />
      </div>
    </div>
  );
}
