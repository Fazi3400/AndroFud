"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { Icons } from "@/components/layouts/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "./PasswordInput";
import { signupSchema } from "../validations";
import { createUserProfile } from "@/features/users/actions";

type FormData = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const supabase = createClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const submitTimeoutRef = React.useRef<NodeJS.Timeout>();

  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      password: searchParams.get("password") || "",
    },
  });

  React.useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  async function onSubmit({ email, password, name }: FormData) {
    // Prevent double submission
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      const from = searchParams?.get("from");

      const unknownError = "Something went wrong, please try again.";

      if (error) {
        let errorMessage = error?.message || unknownError;

        // Handle rate limit error
        if (error?.status === 429 || errorMessage.includes("429")) {
          errorMessage = "Too many sign-up attempts. Please wait a few minutes and try again.";
        }
        // Handle existing email error
        else if (errorMessage.includes("already registered")) {
          errorMessage = "This email is already registered. Please sign in instead.";
        }

        toast({
          title: "Error",
          description: errorMessage,
        });
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        try {
          // Create profile entry in database
          await createUserProfile({
            userId: data.user.id,
            email,
            name,
          });

          toast({
            title: "Account Created",
            description: "Welcome! Your account has been created successfully.",
          });

          // Redirect through role check page just like sign-in
          console.log("SignupForm - User created:", email);
          console.log("SignupForm - Redirecting to role check page");

          submitTimeoutRef.current = setTimeout(() => {
            router.push("/auth/redirect");
            router.refresh();
          }, 500);
        } catch (profileError) {
          console.error("Profile creation error:", profileError);
          toast({
            title: "Warning",
            description: "Account created but profile setup failed. Please try refreshing the page.",
          });
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error("Sign-up error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  }

  return (
    <div style={{ perspective: "1200px" }}>
      <Form {...form}>
        <form
          className="grid gap-6 space-y-4"
          style={{
            animation: "floatIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            transformStyle: "preserve-3d",
          }}
          onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Full Name"
                      {...field}
                      className="w-full rounded-2xl bg-transparent border-2 border-[#38bdf8]/60 text-[#ffffff] placeholder-[#38bdf8]/70 focus:border-[#38bdf8] focus:outline-none transition-all duration-300 py-4 px-6 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-2 ml-6" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group">
                    <Input
                      placeholder="Email Address"
                      type="email"
                      {...field}
                      className="w-full rounded-2xl bg-transparent border-2 border-[#38bdf8]/60 text-[#ffffff] placeholder-[#38bdf8]/70 focus:border-[#38bdf8] focus:outline-none transition-all duration-300 py-4 px-6 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-2 ml-6" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group">
                    <PasswordInput
                      placeholder="Create a strong password"
                      {...field}
                      className="w-full rounded-2xl bg-transparent border-2 border-[#38bdf8]/60 text-[#ffffff] placeholder-[#38bdf8]/70 focus:border-[#38bdf8] focus:outline-none transition-all duration-300 py-4 px-6 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-2 ml-6" />
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            variant="primary"
            className="relative w-full mt-6 py-4 font-bold uppercase tracking-widest text-lg bg-gradient-to-r from-[#0099ff] via-[#00f5ff] to-[#0099ff] text-[#0a0a0a] rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-[#0099ff]/60"
            style={{
              animation: "buttonGlow 2s ease-in-out infinite",
              backgroundSize: "200% 100%",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-2">
              {isLoading && (
                <Icons.spinner
                  className="h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
              )}
              <span>✦ CONTINUE</span>
            </div>
            <span className="sr-only">Continue to email verification page</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm;
