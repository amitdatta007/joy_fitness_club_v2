"use server"

import prisma from "@/lib/prisma";
import { ProductSchemaType, productSchema } from "@/schema/product.schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const getProducts = async (): Promise<ProductSchemaType[]> => {
    // const products = await prisma.product.findMany({
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    // });

    return [];
};

export const addProduct = async (data: ProductSchemaType) => {
    try {
        const validatedData = productSchema.parse(data);

        const isExist = await prisma.product.findFirst({
            where: {
                name: data.name.toLowerCase(),
                size: data.size?.toLowerCase(),
            }
        });

        if (isExist) return {
            status: false,
            message: 'Product Already exist!'
        }

        await prisma.product.create({
            data: {
                name: validatedData.name.toLowerCase(),
                size: validatedData.size?.toLowerCase(),
                description: validatedData.description,
                cost: validatedData.cost,
                price: validatedData.price,
            }
        });

        revalidatePath("/products");

        return {
            status: true,
            message: 'Product Successfully Added!'
        }
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

export const editProduct = async (id: string, data: ProductSchemaType) => {
    try {
        const validatedData = productSchema.parse(data);

        const existingProduct = await prisma.product.findUnique({
            where: { id },
        });

        if (!existingProduct) {
            return {
                status: false,
                message: 'Product not found!',
            };
        }

        const isDuplicate = await prisma.product.findFirst({
            where: {
                id: { not: id },
                name: validatedData.name.toLowerCase(),
                size: validatedData.size?.toLowerCase(),
            },
        });

        if (isDuplicate) {
            return {
                status: false,
                message: 'Another product with the same name and size already exists!',
            };
        }

        await prisma.product.update({
            where: { id },
            data: {
                name: validatedData.name.toLowerCase(),
                size: validatedData.size?.toLowerCase(),
                description: validatedData.description,
                cost: validatedData.cost,
                price: validatedData.price,
                status: validatedData.status || existingProduct.status,
            },
        });

        revalidatePath("/products");

        return {
            status: true,
            message: 'Product successfully updated!',
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.reduce((acc: any, curr) => {
                acc[curr.path[0]] = { message: curr.message };
                return acc;
            }, {});

            return { status: false, errors: formattedErrors };
        }
        return { status: false, message: 'An unexpected error occurred.' };
    }
};
