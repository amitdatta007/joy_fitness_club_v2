import { z } from "zod";

export const productSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string()
      .min(1, { message: "Product Name Required!" })
      .min(3, { message: "Product Name Must Be 3 Characters or More!" }),
    size: z.string().nullable(),
    description: z.string().nullable(),
    status: z
      .enum(['ACTIVE', 'INACTIVE'])
      .nullable()
      .optional(),
    cost: z
      .number({ message: "Product Cost Required!" })
      .min(0.1, { message: "Product Cost Must Be Greater Than 0!" })
      .max(9999999999, { message: "Product Cost Must Be Less Than 10000000000!" }),
    price: z
      .number({ message: "Product Price Required!" })
      .min(0.1, { message: "Product Price Must Be Greater Than 0!" })
      .max(9999999999, { message: "Product Price Must Be Less Than 10000000000!" }),
  })
  .refine((data) => data.price >= data.cost, {
    message: "Product Price must be greater than Cost!",
    path: ["price"], // This will mark the `price` field as invalid if the check fails
  });

export type ProductSchemaType = z.infer<typeof productSchema>;