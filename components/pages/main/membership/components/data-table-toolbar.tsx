"use client";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { Table } from "@tanstack/react-table";
interface DataTableToolbarProps {
  table: Table<any>;
}
export function DataTableToolbar({ table }: DataTableToolbarProps) {

  const globalFilter = table.getState().globalFilter;

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    table.getColumn("name")?.setFilterValue(value);
  };


  return (
    <div className="flex flex-1 flex-wrap items-center gap-2">
      <Input
        placeholder="Search all members..."
        value={globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="h-8 min-w-[200px] max-w-sm"
      />

      <DataTableViewOptions table={table} />
    </div>

  );
}
