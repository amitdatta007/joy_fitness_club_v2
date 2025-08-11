"use server";
import prisma from "@/lib/prisma";
import { RegisterSchemaType, SignInSchemaType, registerSchema, signinSchema } from "@/schema/auth.schema"
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth";



export const registerUser = async (data: RegisterSchemaType) => {
    try {
        const validatedData = registerSchema.parse(data);

        const getUserByEmail = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${data?.email}`);
        const alreadyExist = await getUserByEmail.json();


        if (alreadyExist.status) {
            return {
                status: false,
                errors: {
                    email: { message: "Email Already in Use!" }
                }
            }
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: validatedData.email,
                password: await bcrypt.hash(validatedData.password, 10),
            }),
        });

        const user = await res.json();

        return user;

    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.reduce((acc: any, curr) => {
                acc[curr.path[0]] = { message: curr.message };
                return acc;
            }, {});

            return { status: false, errors: formattedErrors };
        }
        return { status: false, message: "An unexpected error occurred." };
    }
}

export const signInUser = async (data: SignInSchemaType) => {
    try {
        const validatedData = signinSchema.parse(data);

        const getUserByEmail = await fetch(`${process.env.NEXT_PUBLIC_API}/user/${data?.email}`);
        const alreadyExist = await getUserByEmail.json();

        if (!alreadyExist) {
            return {
                status: false,
                errors: {
                    email: { message: "User Not Exist!" }
                }
            }
        };

        const passwordMatch = await bcrypt.compare(data.password, alreadyExist.user.password);
        if (!passwordMatch) {
            return {
                status: false,
                errors: {
                    password: { message: "Wrong Password" }
                }
            }
        }

        const result = await signIn("credentials", {
            redirect: false, // Prevents automatic redirection, allowing you to check the result
            ...validatedData
        });

        if (result?.error) {
            return {
                status: false,
                message: "An unexpected error occurred."
            };
        }

        return {
            status: true,
            message: "Sign-in successful"
        };

    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.reduce((acc: any, curr) => {
                acc[curr.path[0]] = { message: curr.message };
                return acc;
            }, {});

            return { status: false, errors: formattedErrors };
        }
        return { status: false, message: "An unexpected error occurred." };
    }
}

export const logout = async () => {
    await signOut();
}