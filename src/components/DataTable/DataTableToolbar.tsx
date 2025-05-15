import { X } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table";
import DataTableFacetedFilter from "./DataTableFacetedFilter";
import DataTableView from "./DataTableView";

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
          value={(table.getState()?.globalFilter as string) ?? ""}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        {facetedOptions?.map((object) => {
          const column = table.getColumn(`${object.columnName}`);
          return (
            column &&
            table.getColumn(`${object.columnName}`) && (
              <DataTableFacetedFilter
                key={`${object.columnName}`}
                column={table.getColumn(`${object.columnName}`)}
                title={`${object.columnName}`}
                options={object.options}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="border-dashed"
          >
            Сбросить фильтр
            <X />
          </Button>
        )}
      </div>
      <div className="flex flex-1 justify-end gap-4">
        {result.map((item) => (
          <div key={`${item.name}`} className="self-center">
            {item.name} : {item.value} шт
          </div>
        ))}
      </div>
      <div>
        <DataTableView table={table} />
      </div>
    </div>
  );
}
