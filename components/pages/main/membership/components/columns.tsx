"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { ColumnDef } from "@tanstack/react-table";
import { MembershipTableMeta } from "@/types";
import { format, parseISO } from 'date-fns';
import { MembershipFeeWithMemberType } from "@/actions/membershipAction";




export const columns: ColumnDef<MembershipFeeWithMemberType>[] = [
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
    accessorFn: (row) => row.member?.name,
    id: "name",
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
    accessorFn: (row) => row.member?.membership_id,
    id: "membership_id",
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
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Membership Date" />
    ),
    cell: ({ row }) => {

      const { start_date, end_date } = row.original;

      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-medium text-xs">
            {format(parseISO(start_date), 'dd MMM yyyy')} - {format(parseISO(end_date as string), 'dd MMM yyyy')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-mediumj uppercase">
            {row.getValue("amount")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-medium">
            {row.getValue("discount")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "paid_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('paid_status');

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge
            variant="soft"
            className="uppercase"
            color={
              (status === "paid" && "success") || (status === "unpaid" && "destructive") || "default"
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
    accessorKey: "paid_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="max-w-[200px] truncate font-medium">
            {
              row.getValue("paid_date") ? format(parseISO(row.getValue("paid_date")), 'dd MMM yyyy') : ""
            }
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" className="text-primary" />
    ),
    cell: ({ row, table }) => {
      const { setEditModalIsOpen, setSelectedRow, setDeleteModalIsOpen } = table.options.meta as MembershipTableMeta;

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
