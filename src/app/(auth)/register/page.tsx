import {RegisterFormValues} from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
    await requireUnAuth();
    return (
        <div>
            <RegisterFormValues />
        </div>
    );
};

export default Page;

//http://localhost:3000/login
