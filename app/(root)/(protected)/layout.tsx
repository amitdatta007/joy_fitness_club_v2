import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProtectedLayout = async({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if(!session?.user){
        return redirect('/signin')
    }

    return children;
};

export default ProtectedLayout;