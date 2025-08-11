"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { MembersTableMeta } from "@/types";
import { format, parseISO } from 'date-fns';

interface Member {
  name: string;
  membership_id: number;
  phone: number;
  blood_group: string;
  joining_date: string;
  status: any;
}



export const columns: ColumnDef<Member>[] = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#" className="text-primary" />
    ),
    cell: (info) => <div>{info.row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "membership_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Membership ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("membership_id")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("phone")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "blood_group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Blood Group" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-mediumj uppercase">
            {row.getValue("blood_group")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "joining_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joining Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-medium">
            {format(parseISO(row.getValue("joining_date")), 'dd MMM yyyy')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge
            variant="soft"
            className="uppercase"
            color={
              (status === "inactive" && "warning") ||
              (status === "active" && "success") || (status === "deleted" && "destructive") || "default"
            }>
            {status as string}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" className="text-primary" />
    ),
    cell: ({ row, table }) => {
      const { setEditModalIsOpen, setSelectedRow, setDeleteModalIsOpen } = table.options.meta as MembersTableMeta;

      return (
        <DataTableRowActions
          row={row}
          setSelectedRow={setSelectedRow}
          setEditModalIsOpen={setEditModalIsOpen}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
        />
      )
    }
  },
];
