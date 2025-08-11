"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MemberSchemaType } from "@/schema/member.schema";
import EditMemberForm from "./edit-member-form";

interface EditMemberModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    member: MemberSchemaType;
}

const EditMemberModal = ({ open, setOpen, member }: EditMemberModalProps) => {
    const closeModal = () => setOpen((state) => !state);


    console.log(member)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent size="3xl" aria-describedby={'Edit Product'}>
                <DialogDescription className="hidden"></DialogDescription>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-default-700">
                        Enter Member Details
                    </DialogTitle>
                </DialogHeader>
                <EditMemberForm closeModal={closeModal} member={member} />
            </DialogContent>
        </Dialog>
    );
};

export default EditMemberModal;