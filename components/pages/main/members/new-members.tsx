"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import MembersTable from "./member-table";
import Link from "next/link";
import { MemberSchemaType } from "@/schema/member.schema";
import AddMemberModel from "./add-member-model";

const NewMembers = ({ members }: { members: MemberSchemaType[] }) => {

    return (
        <div>
            <Breadcrumbs>
                <BreadcrumbItem><Link href='/dashboard'>Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link href='/members'>All Members</Link></BreadcrumbItem>
                <BreadcrumbItem className="text-primary">New Members </BreadcrumbItem>
            </Breadcrumbs>
            <div className="mt-5">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center py-2">
                        <CardTitle>New Members <span className="text-primary font-bold">({members?.length})</span></CardTitle>
                        <AddMemberModel />
                    </CardHeader>
                    <CardContent className="p-4">
                        <MembersTable members={members} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default NewMembers;