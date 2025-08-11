import { MemberSchemaType } from "@/schema/member.schema";
import { ProductSchemaType } from "@/schema/product.schema";

export type User = {
    id: number;
    email: string;
    name: string;
}

export interface TableMeta {
    setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Replace `any` with your specific row type if you have one
    setSelectedRow: React.Dispatch<React.SetStateAction<ProductSchemaType>>;
}
export interface MembersTableMeta {
    setEditModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Replace `any` with your specific row type if you have one
    setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Replace `any` with your specific row type if you have one
    setSelectedRow: React.Dispatch<React.SetStateAction<MemberSchemaType>>;
}