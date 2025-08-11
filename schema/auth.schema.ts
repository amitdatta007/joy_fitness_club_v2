import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email({ message: "Enter a valid Email!" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;


export const signinSchema = z.object({
    email: z.string().email({ message: "Enter a valid Email!" }),
    password: z.string(),
});
export type SignInSchemaType = z.infer<typeof signinSchema>;