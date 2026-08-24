"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "@/features/auth";
import { Spinner } from "@/components/ui/spinner";
import { User } from "@supabase/supabase-js";
import { AdminUserFormData, adminUserShcema } from "../validations";

type AdminUserFormProps = {
  user?: User;
};

function UpdateUserForm({ user }: AdminUserFormProps) {
  const [isPending] = useTransition();
  const form = useForm<AdminUserFormData>({
    resolver: zodResolver(adminUserShcema),
  });

  const { register, handleSubmit } = form;

  const onSubmit = handleSubmit(async () => {
    // TODO: Implement update user logic
  });

  return (
    <Form {...form}>
      <form
        id="project-form"
        className="gap-x-5 flex gap-y-6 flex-col px-8 py-8 bg-black min-h-screen"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-y-6 max-w-[600px]">
          <FormItem>
            <FormLabel className="text-[#a855f7] text-sm font-medium">
              Email*
            </FormLabel>
            <FormControl>
              <Input
                defaultValue={user?.email || ""}
                aria-invalid={!!form.formState.errors.email}
                placeholder="Type User Email."
                className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                {...register("email")}
              />
            </FormControl>
            <FormDescription className="text-[#67e8f9]">
              User use email to login their account.
            </FormDescription>
            <FormMessage className="text-red-400" />
          </FormItem>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[#a855f7] text-sm font-medium">
                  Password*
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    aria-invalid={!!form.formState.errors}
                    placeholder="Type Password."
                    className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                    {...field}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormDescription className="text-[#67e8f9]">
                    Create a password for this account.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="py-8 flex gap-x-5 items-center">
          <Button
            disabled={isPending}
            form="project-form"
            className="rounded-full bg-[#d8b4fe] hover:bg-[#0099ff] text-white px-8"
          >
            {user ? "Update" : "Create"}
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </Button>
          <Link
            href="/admin/users"
            className={buttonVariants({
              className:
                "rounded-full bg-gray-600 hover:bg-gray-700 text-white px-8",
            })}
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default UpdateUserForm;
