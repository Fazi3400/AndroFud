"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "./input";
import { Button } from "./button";
import { Icons } from "../layouts/icons";

// import { DataTableViewOptions } from "@/app/examples/tasks/components/data-table-view-options"

// import { priorities, statuses } from "../data/data"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] bg-[#0d2818] border-[#0099ff] text-[#a855f7] placeholder-[#d8b4fe] focus:border-[#d8b4fe]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3 text-[#67e8f9] hover:text-[#a855f7] hover:bg-[#1a3a2e]"
          >
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
