"use client";

import * as React from "react";
import { type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type="password"
        className={cn(
          "w-full bg-transparent text-[#ffffff] placeholder-[#38bdf8]/70 focus:ring-0 focus-visible:ring-0 focus:outline-none",
          className,
        )}
      />
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
