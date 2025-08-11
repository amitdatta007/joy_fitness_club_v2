"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  TableOptions,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useEffect, useState } from "react";
import { MemberSchemaType } from "@/schema/member.schema";
import { MembersTableMeta, TableMeta } from "@/types";
import EditMemberModal from "../edit-member-modal";
import DeleteMemberModal from "../delete-member-modal";
// import EditProductModal from "../edit-product-modal";

interface DataTableProps<MemberSchemaType> {
  columns: ColumnDef<MemberSchemaType>[];
  data: MemberSchemaType[];
}


export function DataTable<MemberSchemaType>({ columns, data }: DataTableProps<MemberSchemaType>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedRow, setSelectedRow] = useState<any>();
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      globalFilter,
    },

    onGlobalFilterChange: setGlobalFilter, // ✅ Add this line
    globalFilterFn: (row, columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();
      const fields = ["name", "membership_id", "phone", "blood_group"];

      return fields.some((field) => {
        const value = row.getValue(field);
        return String(value ?? "").toLowerCase().includes(search);
      });
    },

    meta: {
      setSelectedRow,
      setEditModalIsOpen,
      setDeleteModalIsOpen
    } as MembersTableMeta,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });


  useEffect(() => {
    console.log("delete modal", deleteModalIsOpen)
  }, [deleteModalIsOpen])

  return (
    <>
      <div className="space-y-4 relative">
        <DataTableToolbar table={table} />

        <div className="rounded-md border">
          <Table className="w-full">

            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
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

            <TableBody className="w-full">

              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
      {selectedRow?.id && (
        <EditMemberModal
          open={editModalIsOpen}
          setOpen={setEditModalIsOpen}
          member={selectedRow}
        />
      )}
      {selectedRow?.id && (
        <DeleteMemberModal
          open={deleteModalIsOpen}
          setOpen={setDeleteModalIsOpen}
          member={selectedRow}
        />
      )}
    </>
  );
}
