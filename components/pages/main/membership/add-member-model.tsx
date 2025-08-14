import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import AddMemberForm from "./add-member-form";

const AddMemberModel = () => {
    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen((state) => !state)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size='sm'>Add Membership</Button>
            </DialogTrigger>
            <DialogContent size="3xl" className="">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-default-700">
                        Enter Membership Details
                    </DialogTitle>
                </DialogHeader>
                <AddMemberForm closeModal={closeModal} />
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberModel;