"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";


const registerSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  });
  
  type LoginFormValues = z.infer<typeof registerSchema>;
  
  export function LoginForm() {
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
          email: "",
          password: "",
        },
  });
  const onSubmit = async (values: LoginFormValues) => {
    await authClient.signIn.email(
        {
            email: values.email,
            password: values.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                toast.success("Login successful");
                router.push("/");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message as string || "Something went wrong"  || "Invalid email or password"  || ctx.error.code as string  );
            },
        }
    );
  };
  
  const isPending = form.formState.isSubmitting;
  
  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader className="text-center">
                <CardTitle>
                    Welcome back!
                </CardTitle>
                <CardDescription>
                    Login to continue
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                disabled={isPending}
                               
                            >
                             <Image src="/logos/google.svg" alt="Google" width={20} height={20} />
                                Continue with Google
                            </Button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                type="button"
                                disabled={isPending}
                            >
                            <Image src="/logos/github.svg" alt="GitHub" width={20} height={20} />
                                Continue with Github  
                                </Button>
                        </div>
                    <div className="flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>

                                        <Input 
                                        type="email"
                                        placeholder="youremail@example.com"
                                        {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="password"
                                        placeholder="********"
                                        {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                            
                        </Button>
                    </div>
                        <div className="text-center text-sm text-muted-foreground">       
                            <p className="text-sm text-muted-foreground">
                                Don't have an account? 
                                <Link href="/register" className=" underline underline-offset-4">
                                Register
                                </Link>
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Forgot your password? 
                                <Link href="/forgot-password" className="underline underline-offset-4 font-medium">
                                Reset Password
                                </Link>
                            </p>
                        </div>
                    </div>
                    </form> 
                </Form>
            </CardContent>  
        
        </Card>
    </div>
  );
  

};
