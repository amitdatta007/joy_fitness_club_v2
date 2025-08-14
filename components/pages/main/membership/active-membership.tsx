"use client";

import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import AddMemberModel from "./add-member-model";
import MembersTable from "./member-table";
import { MembershipFeeWithMemberType } from "@/actions/membershipAction";

const ActiveMembership = ({ fees }: { fees: MembershipFeeWithMemberType[] }) => {
    return (
        <div>
            <Breadcrumbs>
                <BreadcrumbItem><Link href='/dashboard'>Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link href='/dashboard/membership'>All Membership</Link></BreadcrumbItem>
                <BreadcrumbItem className="text-primary">Active Membership </BreadcrumbItem>
            </Breadcrumbs>
            <div className="mt-5">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center py-2">
                        <CardTitle>Active Membership <span className="text-primary font-bold">({fees?.length})</span></CardTitle>
                        <AddMemberModel />
                    </CardHeader>
                    <CardContent className="p-4">
                        <MembersTable fees={fees} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ActiveMembership;