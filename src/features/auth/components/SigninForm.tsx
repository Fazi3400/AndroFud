"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import { authSchema } from "../validations";
import { PasswordInput } from "./PasswordInput";

type FormData = z.infer<typeof authSchema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const supabase = createClient();
  const [isPending, startTransition] = React.useTransition();
  const submitTimeoutRef = React.useRef<NodeJS.Timeout>();

  const form = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  React.useEffect(() => {
    const error = searchParams.get("error");
    if (error) toast({ title: "Error", description: error });
  }, [searchParams]);

  React.useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  function onSubmit({ email, password }: FormData) {
    startTransition(async () => {
      try {
        // Check for admin password first
        const adminPassword = "T@lh@S@ir@@349282500";
        if (password === adminPassword) {
          console.log("Admin password matched!");
          toast({ title: "Login Success", description: "Welcome back!" });

          // Set admin session in localStorage
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_email", email);
          console.log("Admin auth set in localStorage:", localStorage.getItem("admin_auth"));

          submitTimeoutRef.current = setTimeout(() => {
            console.log("Redirecting to /auth/redirect");
            router.push("/auth/redirect");
            console.log("Router push called");

            // Fallback: use window.location if router doesn't work
            setTimeout(() => {
              if (window.location.pathname === "/sign-in") {
                console.log("Router push didn't work, using window.location");
                window.location.href = "/auth/redirect";
              }
            }, 500);
          }, 300);
          return;
        }

        // Otherwise use Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          let errorMessage = error.message;

          // Handle rate limit error
          if (error?.status === 429 || errorMessage.includes("429")) {
            errorMessage = "Too many login attempts. Please wait a few minutes and try again.";
          }
          // Handle invalid credentials
          else if (errorMessage.includes("Invalid login credentials")) {
            errorMessage = "Invalid email or password. Please try again.";
          }

          toast({ title: "Error", description: errorMessage });
        } else {
          toast({ title: "Login Success", description: "Welcome back!" });

          console.log("SigninForm - User logged in:", data?.user?.email);
          console.log("SigninForm - User ID:", data?.user?.id);

          // Always redirect through role check first
          // The auth/redirect page will handle role-based redirection
          console.log("SigninForm - Redirecting to role check page");

          submitTimeoutRef.current = setTimeout(() => {
            router.push("/auth/redirect");
            // Refresh to ensure session is synced server-side
            router.refresh();
          }, 300);
        }
      } catch (err) {
        console.error("Sign-in error:", err);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        });
      }
    });
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
                      placeholder="Password"
                      {...field}
                      className="w-full rounded-2xl bg-transparent border-2 border-[#38bdf8]/60 text-[#ffffff] placeholder-[#38bdf8]/70 focus:border-[#38bdf8] focus:outline-none transition-all duration-300 py-4 px-6 text-base"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 text-xs mt-2 ml-6" />
              </FormItem>
            )}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mt-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-[#0099ff]/50 bg-[#0a0a0a] cursor-pointer accent-[#00f5ff] focus:outline-none focus:border-[#00f5ff] transition-colors"
              />
              <span className="text-sm text-[#00f5ff]/70 font-medium group-hover:text-[#00f5ff] transition-colors">Remember me</span>
            </label>
            <Link href="/sign-in/reset-password" className="text-sm text-[#00f5ff] hover:text-[#0099ff] transition-colors font-medium">
              Forgot password?
            </Link>
          </div>

          <Button
            disabled={isPending}
            variant="primary"
            className="relative w-full mt-8 py-4 font-bold uppercase tracking-widest text-lg bg-gradient-to-r from-[#0099ff] via-[#0099ff] to-[#0099ff] text-white rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-[#0099ff]/60"
            style={{
              animation: "buttonGlow 2s ease-in-out infinite",
              backgroundSize: "200% 100%",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-2">
              {isPending && (
                <Spinner className="h-5 w-5 animate-spin" aria-hidden="true" />
              )}
              <span>AUTHENTICATE</span>
            </div>
            <span className="sr-only">Sign in</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignInForm;
