import { z } from "zod";

export const membershipFeeSchema = z.object({
  id: z.number().optional(),
  member_id: z.number({
    required_error: 'Member ID is required',
  }),
  start_date: z.string({ required_error: 'Start date is required' }),
  end_date: z.string().optional(),
  amount: z.number({
    required_error: 'Amount is required',
    invalid_type_error: 'Amount must be a number',
  }),
  discount: z.preprocess(
    (val) => (val === '' || Number.isNaN(val) ? 0 : val),
    z.number().min(0, 'Discount cannot be negative')
  ),
  payment_method: z.enum(['cash', 'bkash', 'nagad'], {
    required_error: 'Payment method is required',
  }).optional(),
  paid_status: z.enum(['paid', 'unpaid'], {
    required_error: 'Paid status is required',
  }),
  paid_date: z.string().optional(),
  note: z.string().optional(),
});

export type MembershipSchemaType = z.infer<typeof membershipFeeSchema>;
