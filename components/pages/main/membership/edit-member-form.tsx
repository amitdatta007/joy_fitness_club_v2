"use client"

import { addMember, editMember } from "@/actions/memberAction";
import { addProduct } from "@/actions/productAction";
import DatePicker from "@/components/date-picker";
import DatePickerWithRange from "@/components/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createMemberSchema, MemberSchemaType } from "@/schema/member.schema";
import { ProductSchemaType, productSchema } from "@/schema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
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

const EditMemberForm = ({ closeModal, member }: { closeModal: () => void; member:  MemberSchemaType}) => {
    // const originalAdmissionFee = 2000;
    const [isPending, startTransition] = useTransition();

    const memberSchema = createMemberSchema(0);


    const { id, name, admission_fee, blood_group, gender, membership_id, phone, email, address, date_of_birth, note,  } = member;


    const {
        register,
        handleSubmit,
        reset,
        setError,
        control,
        watch,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<MemberSchemaType>({
        resolver: zodResolver(memberSchema),
        defaultValues: {
            name,
            admission_fee,
            blood_group, gender, membership_id, phone,
            address, date_of_birth, note, email: email || ""
        }
    });



    const onSubmit = (data: MemberSchemaType) => {
        startTransition(async () => {



            const result = await editMember(id, data);

            // if (!result?.status && result?.errors) {
            //     const errors = result.errors as FormErrors;
            //     Object.entries(errors).forEach(([field, error]) => {
            //         setError(field as keyof FormErrors, { type: "server", message: (error as FieldError).message });
            //     });

            //     return;
            // }

            if (!result?.status && result?.message) {
                toast.error(result.message);
                return;
            }

            if (result.status && result.message) {
                toast.success(result.message);
                reset();
                closeModal();
            }

        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div>
                <div>
                    <Label className="mb-2" htmlFor="name">Name <span className="text-warning">*</span></Label>
                    <Input
                        removeWrapper
                        type="text"
                        id="name"
                        size="lg"
                        placeholder="Enter Name"
                        disabled={isPending}
                        {...register("name")}
                        className={cn("peer", {
                            "border-destructive": errors.name,
                        })}
                    />
                </div>
                {errors.name && (
                    <div className="text-xs text-destructive mt-2">{errors.name.message}</div>
                )}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="gender">Gender <span className="text-warning">*</span></Label>

                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger id="gender" className={cn("peer", {
                                    "border-destructive": errors.gender,
                                })}>
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent className="z-[9999]" {...register('gender')}>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                </div>
                {errors.gender && (
                    <div className="text-xs text-destructive mt-2">{errors.gender.message}</div>
                )}
            </div>


            <div>
                <div>
                    <Label className="mb-2" htmlFor="phone">Phone <span className="text-warning">*</span></Label>
                    <Input
                        removeWrapper
                        type="number"
                        id="phone"
                        size="lg"
                        placeholder="Enter Phone Number"
                        disabled={isPending}
                        {...register("phone")}
                        className={cn("peer", {
                            "border-destructive": errors.phone,
                        })}
                    />
                </div>
                {errors.phone && (
                    <div className="text-xs text-destructive mt-2">{errors.phone.message}</div>
                )}
            </div>
            <div>
                <div>
                    <Label className="mb-2" htmlFor="email">Email Address</Label>
                    <Input
                        removeWrapper
                        type="text"
                        id="email"
                        size="lg"
                        placeholder="Enter Email Address"
                        disabled={isPending}
                        {...register("email")}
                        className={cn("peer", {
                            "border-destructive": errors.email,
                        })}
                    />
                </div>
                {errors.email && (
                    <div className="text-xs text-destructive mt-2">{errors.email.message}</div>
                )}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="blood_group">Blood Group <span className="text-warning">*</span></Label>

                    <Controller
                        name="blood_group"
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange} disabled={isPending}>
                                <SelectTrigger id="blood_group" className={cn("peer", {
                                    "border-destructive": errors.gender,
                                })}>
                                    <SelectValue placeholder="Select Bload Group" />
                                </SelectTrigger>
                                <SelectContent className="z-[9999]" {...register('blood_group')}>
                                    <SelectItem value="o+">O+</SelectItem>
                                    <SelectItem value="a+">A+</SelectItem>
                                    <SelectItem value="b+">B+</SelectItem>
                                    <SelectItem value="ab+">AB+</SelectItem>
                                    <SelectItem value="o-">O-</SelectItem>
                                    <SelectItem value="a-">A-</SelectItem>
                                    <SelectItem value="b-">B-</SelectItem>
                                    <SelectItem value="ab-">AB-</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />

                </div>
                {errors.blood_group && (
                    <div className="text-xs text-destructive mt-2">{errors.blood_group.message}</div>
                )}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="date_of_birth">Date Of Birth </Label>

                    <DatePicker
                        step='any'
                        id="date_of_birth"
                        size="lg"
                        disabled={isPending}
                        hasRegister={true}
                        register={register}
                        fieldName="date_of_birth"
                        className={cn("peer text-start", {
                            "border-destructive": errors.date_of_birth,
                        })}
                        defaultDate={date_of_birth}
                    />

                </div>
                {errors.date_of_birth && (
                    <div className="text-xs text-destructive mt-2">{errors.date_of_birth.message}</div>
                )}
            </div>
            <div>
                <div>
                    <Label className="mb-2" htmlFor="address">Address <span className="text-warning">*</span></Label>
                    <Input
                        removeWrapper
                        type="text"
                        id="address"
                        size="lg"
                        placeholder="Enter Address"
                        disabled={isPending}
                        {...register("address")}
                        className={cn("peer", {
                            "border-destructive": errors.address,
                        })}
                    />
                </div>
                {errors.address && (
                    <div className="text-xs text-destructive mt-2">{errors.address.message}</div>
                )}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="membership_id">Membership ID <span className="text-warning">*</span></Label>
                    <Input
                        removeWrapper
                        type="number"
                        id="membership_id"
                        size="lg"
                        placeholder="Enter Membership ID"
                        disabled={isPending}
                        {...register("membership_id", { valueAsNumber: true })}
                        className={cn("peer", {
                            "border-destructive": errors.membership_id,
                        })}
                    />
                </div>
                {errors.membership_id && (
                    <div className="text-xs text-destructive mt-2">{errors.membership_id.message}</div>
                )}
            </div>




            <div>
                <div>
                    <Label className="mb-2" htmlFor="admission_fee">Admission Fee <span className="text-warning">*</span></Label>
                    <Input
                        removeWrapper
                        type="number"
                        id="admission_fee"
                        size="lg"
                        disabled
                        {...register("admission_fee", { valueAsNumber: true })}
                        className={cn("peer", {
                            "border-destructive": errors.admission_fee,
                        })}
                    />
                </div>
                {errors.admission_fee && (
                    <div className="text-xs text-destructive mt-2">{errors.admission_fee.message}</div>
                )}
            </div>

            <div>
                <div>
                    <Label className="mb-2" htmlFor="discount">Discount <span className="text-warning">*</span></Label>
                    <Input
                        removeWrapper
                        type="number"
                        id="discount"
                        {...register('discount', { valueAsNumber: true })}
                        size="lg"
                        placeholder="Enter Discount Amount"
                        disabled
                    />
                </div>
                {errors.discount && (
                    <div className="text-xs text-destructive mt-2">{errors.discount.message}</div>
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

export default EditMemberForm;