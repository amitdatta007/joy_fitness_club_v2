"use client"

import { addMember, getMembers } from "@/actions/memberAction";
import { addProduct } from "@/actions/productAction";
import DatePicker from "@/components/date-picker";
import DatePickerWithRange from "@/components/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createMemberSchema, MemberSchemaType } from "@/schema/member.schema";
import { membershipFeeSchema, MembershipSchemaType } from "@/schema/membership.schema";
import { ProductSchemaType, productSchema } from "@/schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FieldError = { message: string };
type FormErrors = {
    name?: { message: string };
    size?: { message: string };
    cost?: { message: string };
    price?: { message: string };
    description?: { message: string };
};

// const AddMemberForm = ({ closeModal }: { closeModal: () => void; }) => {
//     const [isPending, startTransition] = useTransition();
//     const [members, setMembers] = useState<MemberSchemaType[]>([]);
//     const [open, setOpen] = useState(false);
//     const [memberID, setMemberID] = useState<any>();

//     useEffect(() => {
//         console.log(memberID)
//     }, [memberID])

//     useEffect(() => {
//         getMembers()
//             .then((data) => {
//                 setMembers(data)
//             })
//             .catch(() => {
//                 setMembers([])
//             })
//     }, []);

//     useEffect(() => {
//         console.log(memberID)

//     }, [memberID])


//     const {
//         register,
//         handleSubmit,
//         reset,
//         control,
//         formState: { errors },
//     } = useForm<MembershipSchemaType>({
//         resolver: zodResolver(membershipFeeSchema),
//         defaultValues: {
//             discount: 0,
//         }
//     });


//     const onSubmit = (data: MembershipSchemaType) => {


//         startTransition(async () => {



//             // const result = await addMember(data);

//             // if (!result?.status && result?.errors) {
//             //     const errors = result.errors as FormErrors;
//             //     Object.entries(errors).forEach(([field, error]) => {
//             //         setError(field as keyof FormErrors, { type: "server", message: (error as FieldError).message });
//             //     });

//             //     return;
//             // }

//             // if (!result?.status && result?.message) {
//             //     toast.error(result.message);
//             //     return;
//             // }

//             // if (result.status && result.message) {
//             //     toast.success(result.message);
//             //     reset();
//             //     closeModal();
//             // }

//         });
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">


//             <div>
//                 <div>
//                     <Label className="mb-2" htmlFor="member_id">Member <span className="text-warning">*</span></Label>

//                     <div className="w-full">


//                         <Popover open={open} onOpenChange={setOpen}>
//                             <Input type="number" className="hidden" value={parseInt(memberID)} {...register('member_id', { valueAsNumber: true })} />
//                             <PopoverTrigger asChild className="w-full z-[999999]">
//                                 <Button
//                                     variant="outline"
//                                     role="combobox"
//                                     aria-expanded={open}
//                                     className=" justify-between"
//                                 >
//                                     {memberID ? `${members.find((member) => member.id == memberID)
//                                         ?.name} - ${members.find((member) => member.id == memberID)
//                                             ?.membership_id}`
//                                         : "Select Member..."}
//                                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                 </Button>
//                             </PopoverTrigger>
//                             <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[999999]">
//                                 <Command>
//                                     <CommandInput placeholder="Search framework..." />
//                                     <CommandEmpty>No framework found.</CommandEmpty>
//                                     <CommandGroup>
//                                         {members.map((member, i) => (
//                                             <CommandItem
//                                                 key={i}
//                                                 value={`${member.id}`}
//                                                 onSelect={(currentValue) => {
//                                                     setMemberID(currentValue)
//                                                     setOpen(false);
//                                                 }}
//                                             >
//                                                 <Check
//                                                     className={cn(
//                                                         "mr-2 h-4 w-4",
//                                                         memberID === member.id
//                                                             ? "opacity-100"
//                                                             : "opacity-0"
//                                                     )}
//                                                 />
//                                                 {member.name} - {member.membership_id}
//                                             </CommandItem>
//                                         ))}
//                                     </CommandGroup>
//                                 </Command>
//                             </PopoverContent>
//                         </Popover>


//                     </div>

//                 </div>
//                 {errors.member_id && (
//                     <div className="text-xs text-destructive mt-2">{errors.member_id.message}</div>
//                 )}
//             </div>

//             <div>
//                 <div>
//                     <Label className="mb-2" htmlFor="date_of_birth">Start Date </Label>

//                     <DatePicker
//                         step='any'
//                         id="start_date"
//                         size="lg"
//                         disabled={isPending}
//                         hasRegister={true}
//                         register={register}
//                         fieldName="start_date"
//                         className={cn("peer text-start", {
//                             "border-destructive": errors.start_date,
//                         })}
//                     />

//                 </div>
//                 {errors.start_date && (
//                     <div className="text-xs text-destructive mt-2">{errors.start_date.message}</div>
//                 )}
//             </div>
//             <div>
//                 <div>
//                     <Label className="mb-2" htmlFor="amount">Amount <span className="text-warning">*</span></Label>
//                     <Input
//                         removeWrapper
//                         type="number"
//                         id="amount"
//                         size="lg"
//                         placeholder="Enter Amount"
//                         disabled={isPending}
//                         {...register("amount")}
//                         className={cn("peer", {
//                             "border-destructive": errors.amount,
//                         })}
//                     />
//                 </div>
//                 {errors.amount && (
//                     <div className="text-xs text-destructive mt-2">{errors.amount.message}</div>
//                 )}
//             </div>

//             <div>
//                 <div>
//                     <Label className="mb-2" htmlFor="discount">Discount</Label>
//                     <Input
//                         removeWrapper
//                         type="number"
//                         id="discount"
//                         size="lg"
//                         placeholder="Enter Discount Amount"
//                         disabled={isPending}
//                         {...register("discount", { valueAsNumber: true })}
//                         className={cn("peer", {
//                             "border-destructive": errors.discount,
//                         })}
//                     />
//                 </div>
//                 {errors.discount && (
//                     <div className="text-xs text-destructive mt-2">{errors.discount.message}</div>
//                 )}
//             </div>

//             <div>
//                 <div>
//                     <Label className="mb-2" htmlFor="paid_status">Paid Status <span className="text-warning">*</span></Label>

//                     <Controller
//                         name="paid_status"
//                         control={control}
//                         render={({ field }) => (
//                             <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
//                                 <SelectTrigger id="paid_status" className={cn("peer", {
//                                     "border-destructive": errors.paid_status,
//                                 })}>
//                                     <SelectValue placeholder="Select Paid Status" />
//                                 </SelectTrigger>
//                                 <SelectContent className="z-[9999]" {...register('paid_status')}>
//                                     <SelectItem value="unpaid">Unpaid</SelectItem>
//                                     <SelectItem value="paid">Paid</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         )}
//                     />

//                 </div>
//                 {errors.paid_status && (
//                     <div className="text-xs text-destructive mt-2">{errors.paid_status.message}</div>
//                 )}
//             </div>

//             <div>
//                 <div>
//                     <Label className="mb-2" htmlFor="payment_method">Payment Method <span className="text-warning">*</span></Label>

//                     <Controller
//                         name="payment_method"
//                         control={control}
//                         render={({ field }) => (
//                             <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
//                                 <SelectTrigger id="payment_method" className={cn("peer", {
//                                     "border-destructive": errors.payment_method,
//                                 })}>
//                                     <SelectValue placeholder="Select Payment Method" />
//                                 </SelectTrigger>
//                                 <SelectContent className="z-[9999]" {...register('payment_method')}>
//                                     <SelectItem value="cash">Cash</SelectItem>
//                                     <SelectItem value="bkash">Bkash</SelectItem>
//                                     <SelectItem value="nagad">Nagad</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         )}
//                     />

//                 </div>
//                 {errors.payment_method && (
//                     <div className="text-xs text-destructive mt-2">{errors.payment_method.message}</div>
//                 )}
//             </div>


//             <div className="md:col-span-2">
//                 <div>
//                     <Label className="mb-2" htmlFor="note">Note</Label>
//                     <Textarea
//                         id="note"
//                         placeholder="Note"
//                         disabled={isPending}
//                         {...register("note")}
//                         className={cn("peer", {
//                             "border-destructive": errors.note,
//                         })}
//                         rows={1}
//                     />
//                 </div>
//                 {errors.note && (
//                     <div className="text-xs text-destructive mt-2">{errors.note.message}</div>
//                 )}
//             </div>



//             <DialogFooter className="md:col-span-2">
//                 <DialogClose asChild>
//                     <Button size='sm' color="destructive" type="button" disabled={isPending}>
//                         Cancel
//                     </Button>
//                 </DialogClose>
//                 <Button size='sm' color="info" type="submit" disabled={isPending}>Save</Button>
//             </DialogFooter>

//         </form >
//     );
// };

const AddMemberForm = ({ closeModal }: { closeModal: () => void }) => {
    const [isPending, startTransition] = useTransition();
    const [members, setMembers] = useState<MemberSchemaType[]>([]);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setValue,
    } = useForm<MembershipSchemaType>({
        resolver: zodResolver(membershipFeeSchema),
        defaultValues: {
            discount: 0,
            paid_status: undefined,
            payment_method: undefined,
        },
    });

    useEffect(() => {
        getMembers()
            .then(setMembers)
            .catch(() => setMembers([]));
    }, []);

    const onSubmit = (data: MembershipSchemaType) => {
        startTransition(async () => {
            console.log("Submitting", data);
            // API call here...
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">

            {/* Member ID */}
            <div>
                <Label htmlFor="member_id" className="mb-2">Member <span className="text-warning">*</span></Label>
                <Controller
                    name="member_id"
                    control={control}
                    render={({ field }) => (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild className="w-full z-[999999]">
                                <Button variant="outline" role="combobox" aria-expanded={open} className={cn("justify-between border-default-300 text-default-500 focus:outline-none focus:border-primary disabled:bg-default-200  placeholder:text-accent-foreground/50 font-normal", errors.member_id && "border-destructive" )}>
                                    {field.value
                                        ? `${members.find(m => m.id === field.value)?.name} - ${members.find(m => m.id === field.value)?.membership_id}`
                                        : "Select Member..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[999999]">
                                <Command>
                                    <CommandInput placeholder="Search member..." />
                                    <CommandEmpty>No member found.</CommandEmpty>
                                    <CommandGroup>
                                        {members.map((member) => (
                                            <CommandItem
                                                key={member.id}
                                                onSelect={() => {
                                                    field.onChange(member.id);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Check
                                                    className={cn("mr-2 h-4 w-4", field.value === member.id ? "opacity-100" : "opacity-0")}
                                                />
                                                {member.name} - {member.membership_id}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.member_id && <p className="text-xs text-destructive mt-2">{errors.member_id.message}</p>}
            </div>

            {/* Start Date */}
            <div>
                <div>
                    <Label className="mb-2" htmlFor="date_of_birth">Start Date </Label>
                    <DatePicker
                        id="start_date"
                        size="lg"
                        disabled={isPending}
                        hasRegister={true}
                        register={register}
                        fieldName="start_date"
                        className={cn("peer text-start", {
                            "border-destructive": errors.start_date,
                        })}
                    />

                </div>
                {errors.start_date && (
                    <div className="text-xs text-destructive mt-2">{errors.start_date.message}</div>
                )}
            </div>

            {/* Amount */}
            <div>
                <Label htmlFor="amount" className="mb-2">Amount <span className="text-warning">*</span></Label>
                <Input
                    size='lg'
                    type="number"
                    id="amount"
                    placeholder="Enter Amount"
                    disabled={isPending}
                    {...register("amount", { valueAsNumber: true })}
                    className={cn("peer", { "border-destructive": errors.amount })}
                />
                {errors.amount && <p className="text-xs text-destructive mt-2">{errors.amount.message}</p>}
            </div>

            {/* Discount */}
            <div>
                <Label htmlFor="discount" className="mb-2">Discount</Label>
                <Input
                    size='lg'
                    type="number"
                    id="discount"
                    placeholder="Enter Discount"
                    disabled={isPending}
                    {...register("discount", { valueAsNumber: true })}
                    className={cn("peer", { "border-destructive": errors.discount })}
                />
                {errors.discount && <p className="text-xs text-destructive mt-2">{errors.discount.message}</p>}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="paid_status">Paid Status <span className="text-warning">*</span></Label>

                    <Controller
                        name="paid_status"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger id="paid_status" className={cn("peer", {
                                    "border-destructive": errors.paid_status,
                                })}>
                                    <SelectValue placeholder="Select Paid Status" />
                                </SelectTrigger>
                                <SelectContent className="z-[9999]" {...register('paid_status')}>
                                    <SelectItem value="unpaid">Unpaid</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                </div>
                {errors.paid_status && (
                    <div className="text-xs text-destructive mt-2">{errors.paid_status.message}</div>
                )}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="payment_method">Payment Method </Label>

                    <Controller
                        name="payment_method"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger id="payment_method" className={cn("peer", {
                                    "border-destructive": errors.payment_method,
                                })}>
                                    <SelectValue placeholder="Select Payment Method" />
                                </SelectTrigger>
                                <SelectContent className="z-[9999]" {...register('payment_method')}>
                                    <SelectItem value="cash">Cash</SelectItem>
                                    <SelectItem value="bkash">Bkash</SelectItem>
                                    <SelectItem value="nagad">Nagad</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                </div>
                {errors.payment_method && (
                    <div className="text-xs text-destructive mt-2">{errors.payment_method.message}</div>
                )}
            </div>


            <div className="md:col-span-2">
                <div>
                    <Label className="mb-2" htmlFor="note">Note</Label>
                    <Textarea
                        id="note"
                        placeholder="Note"
                        disabled={isPending}
                        {...register("note")}
                        className={cn("peer", {
                            "border-destructive": errors.note,
                        })}
                        rows={1}
                    />
                </div>
                {errors.note && (
                    <div className="text-xs text-destructive mt-2">{errors.note.message}</div>
                )}
            </div>

            {/* Actions */}
            <DialogFooter className="md:col-span-2">
                <DialogClose asChild>
                    <Button size='sm' color="destructive" type="button" disabled={isPending}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button size='sm' color="info" type="submit" disabled={isPending}>Save</Button>
            </DialogFooter>
        </form>
    );
};


export default AddMemberForm;