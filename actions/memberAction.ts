"use server"

import { MemberSchemaType, createMemberSchema } from "@/schema/member.schema";
import { revalidatePath } from "next/cache";


export const getMembers = async (status?: string): Promise<MemberSchemaType[]> => {
    try {
        const res = status ? await fetch(`${process.env.NEXT_PUBLIC_API}/members?status=${status},`) : await fetch(`${process.env.NEXT_PUBLIC_API}/members`, {
            cache: "no-cache"
        });

        const { members } = await res.json();

        return members;
    } catch (error) {
        return []
    }
};
export const getMonthlyMembers = async (yearMonth?: string): Promise<MemberSchemaType[]> => {
    try {

        const res = yearMonth ? await fetch(`${process.env.NEXT_PUBLIC_API}/members/monthly-joining?year_month=${yearMonth}`, {
            cache: "no-cache"
        }) : await fetch(`${process.env.NEXT_PUBLIC_API}/members/monthly-joining`, {
            cache: "no-cache"
        });
        const { members } = await res.json();

        return members;
    } catch (error) {
        return []
    }
};

export const addMember = async (data: MemberSchemaType) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const member = await res.json();

        revalidatePath("/members");

        return member
    } catch (error) {
        return { status: false, message: "An unexpected error occurred." };
    }
}

export const editMember = async (id: any, data: MemberSchemaType) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/members/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const member = await res.json();

        revalidatePath("/members");

        return member
    } catch (error) {
        return { status: false, message: "An unexpected error occurred." };
    }
}
export const deleteMember = async (id: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/members/${id}`, {
            method: 'DELETE',
        });

        const member = await res.json();

        revalidatePath("/members");

        return member;
    } catch (error) {
        return { status: false, message: "An unexpected error occurred." };
    }
}