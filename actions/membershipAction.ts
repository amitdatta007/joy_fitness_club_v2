"use server"

import { MemberSchemaType } from "@/schema/member.schema";
import { MembershipSchemaType } from "@/schema/membership.schema";


export type MembershipFeeWithMemberType = MembershipSchemaType & {
    member: MemberSchemaType;
};

export const getMembershipFees = async (): Promise<MembershipFeeWithMemberType[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/membership-fees`)

        const { fees } = await res.json();

        return fees;
    } catch (error) {
        return []
    }
};