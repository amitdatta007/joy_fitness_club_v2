import { MembershipFeeWithMemberType } from "@/actions/membershipAction";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";


export default function AdvancedTable({ fees }: { fees: MembershipFeeWithMemberType[] }) {
  return (
      <DataTable
        data={fees as any}
        columns={columns}
      />
  );
}
