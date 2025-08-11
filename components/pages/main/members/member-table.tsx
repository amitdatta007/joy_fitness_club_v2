import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { MemberSchemaType } from "@/schema/member.schema";


export default function AdvancedTable({ members }: { members: MemberSchemaType[] }) {
  return (
      <DataTable
        data={members as any}
        columns={columns}
      />
  );
}
