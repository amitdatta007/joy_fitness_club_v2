"use client";

import { MoreHorizontal, Pencil } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MembershipTableMeta } from "@/types";
import { MembershipFeeWithMemberType } from "@/actions/membershipAction";


interface DataTableRowActionsProps extends MembershipTableMeta {
  row: Row<any>;
}

export function DataTableRowActions({ row, setEditModalIsOpen, setDeleteModalIsOpen, setSelectedRow }: DataTableRowActionsProps) {
  const openEditModal = () => {
    setSelectedRow(() => row.original as MembershipFeeWithMemberType)
    setEditModalIsOpen((state) => !state)
  }
  const openDeleteModal = () => {
    setSelectedRow(() => row.original as MembershipFeeWithMemberType)
    setDeleteModalIsOpen((state) => !state)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="float-right" >
        <Button
          variant="soft"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          className="focus:bg-default-200 focus:text-default-950 text-default-500 cursor-pointer"
          onClick={openEditModal}
        >
          <Pencil className="w-4 h-4 mr-2" />
          <p className="text-sm leading-5 mt-0.5">Edit</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-default-200 focus:text-default-950 text-default-500 cursor-pointer"
          onClick={openDeleteModal}
        >
          <Pencil className="w-4 h-4 mr-2" />
          <p className="text-sm leading-5 mt-0.5">Delete</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
