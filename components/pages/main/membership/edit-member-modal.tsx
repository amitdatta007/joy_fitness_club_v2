"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditMemberForm from "./edit-member-form";
import { MembershipFeeWithMemberType } from "@/actions/membershipAction";

interface EditMemberModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    membership: MembershipFeeWithMemberType;
}

const EditMemberModal = ({ open, setOpen, membership }: EditMemberModalProps) => {
    const closeModal = () => setOpen((state) => !state);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent size="3xl" aria-describedby={'Edit Product'}>
                <DialogDescription className="hidden"></DialogDescription>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-default-700">
                        Enter Membership Details
                    </DialogTitle>
                </DialogHeader>
                <EditMemberForm closeModal={closeModal} membership={membership} />
            </DialogContent>
        </Dialog>
    );
};

export default EditMemberModal;