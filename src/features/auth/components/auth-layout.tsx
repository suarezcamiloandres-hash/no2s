import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-center h-screen gap-6 p-6 md:p-10 lg:p-16">
         <div className="flex flex-col gap-y-6 w-full max-w-sm">
             <Link href="/" className="flex items-center gap-x-2">
              <Image src="/logos/logo.svg" alt="Logo" width={40} height={40}/>
                <span className="text-xl font-bold">No2s.com   </span>
            </Link>
            {children}
         </div>
        </div>
    );
};

export default AuthLayout;