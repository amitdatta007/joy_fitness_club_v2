"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MemberSchemaType } from "@/schema/member.schema";
import EditMemberForm from "./edit-member-form";
import { Button } from "@/components/ui/button";
import { deleteMember } from "@/actions/memberAction";
import toast from "react-hot-toast";
import { deleteMembership, MembershipFeeWithMemberType } from "@/actions/membershipAction";

interface DeleteMemberModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    membership: MembershipFeeWithMemberType;
}

const DeleteMemberModal = ({ open, setOpen, membership }: DeleteMemberModalProps) => {
    const [isPending, startTransition] = useTransition();
    const closeModal = () => setOpen((state) => !state);




    const onSubmit = () => {
        startTransition(async () => {



            const result = await deleteMembership(membership.id);

            console.log(result)


            if (!result?.status && result?.message) {
                toast.error(result.message);
                return;
            }

            if (result.status && result.message) {
                toast.success(result.message);
                closeModal();
            }

        });
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent size="lg" aria-describedby={'Edit Product'}>
                <DialogDescription className="hidden"></DialogDescription>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-default-700">
                        Want to delete this membership?
                    </DialogTitle>
                </DialogHeader>

                {/* <div className="text-sm text-default-500  space-y-4">
                    {
                        member.status === 'deleted' ? <p>
                            All member data, including admission fee and monthly membership fee information, will be permanently deleted.
                        </p> : <p>
                            This member will be marked as deleted. Their data will be retained in the system.
                        </p>
                    }
                </div> */}

                <DialogFooter className="mt-8">
                    <DialogClose asChild>
                        <Button type="submit" size='sm' variant="outline" color="destructive" disabled={isPending}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button onClick={onSubmit} size='sm' color="destructive" disabled={isPending}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteMemberModal;