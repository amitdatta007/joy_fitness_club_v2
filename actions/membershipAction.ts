"use server"

import { MemberSchemaType } from "@/schema/member.schema";
import { MembershipSchemaType } from "@/schema/membership.schema";
import { revalidatePath } from "next/cache";


export type MembershipFeeWithMemberType = MembershipSchemaType & {
    member: MemberSchemaType;
};

export const getMembershipFees = async (): Promise<MembershipFeeWithMemberType[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/membership-fees`, {
            cache: "no-cache"
        })
        

        const { fees } = await res.json();

        return fees;
    } catch (error) {
        return []
    }
};
export const getActiveMembershipFees = async (): Promise<MembershipFeeWithMemberType[]> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/membership-fees/active`, {
            cache: "no-cache"
        })

        const { fees } = await res.json();

        return fees;
    } catch (error) {
        return []
    }
};

export const addMembership = async (data: MembershipSchemaType) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/membership-fees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const member = await res.json();

        revalidatePath("/membership");

        return member
    } catch (error) {
        return { status: false, message: "An unexpected error occurred." };
    }
}
export const editMembership = async (id: any, data: MembershipSchemaType) => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/membership-fees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const member = await res.json();

        revalidatePath("/membership");

        return member
    } catch (error) {
        return { status: false, message: "An unexpected error occurred." };
    }
}

export const deleteMembership = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/membership-fees/${id}`, {
            method: 'DELETE',
        });

        const member = await res.json();

        revalidatePath("/membership");

        return member;
    } catch (error) {
        return { status: false, message: "An unexpected error occurred." };
    }
}