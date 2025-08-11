// schema/member.schema.ts
import { z } from "zod";

export const createMemberSchema = (maxDiscount: number) =>
    z
        .object({
            id: z.number().optional(),
            image: z.string().optional(), // image filename or URL

            name: z.string().min(2, 'Name is required and must be at least 2 characters'),

            email: z
                .union([z.string().email("Invalid email"), z.literal("")])
                .optional(),

            address: z.string().optional(),

            date_of_birth: z
                .string()
                .optional(),

            gender: z.enum(['male', 'female'], {
                required_error: 'Gender is required',
                invalid_type_error: 'Gender must be male or female'
            }),

            blood_group: z.enum(['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'], {
                required_error: 'Blood Group is required',
                invalid_type_error: 'Blood Group must be valid'
            }),

            phone: z.string().min(6, 'Phone is required and must be valid'),

            membership_id: z
                .number({
                    required_error: 'Membership ID is required',
                    invalid_type_error: 'Membership ID must be a number'
                }),

            admission_fee: z
                .number({
                    required_error: 'Admission fee is required',
                    invalid_type_error: 'Admission fee must be a number'
                }),

            note: z.string().optional(),
            status: z.enum(['active', 'inactive', 'deleted']).optional(),
            discount: z.number().optional(),
        })
        .refine(
            (data) => !data.discount || data.discount <= maxDiscount,
            {
                path: ["discount"],
                message: "Discount cannot be more than Admission Fee",
            }
        );

export type MemberSchemaType = z.infer<ReturnType<typeof createMemberSchema>> & object;
