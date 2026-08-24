"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormContext } from "react-hook-form";

type BadgeSelectFieldProps = {
  name: string;
  label: string;
};

function BadgeSelectField({}: BadgeSelectFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="badge"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-[#a855f7] text-sm font-medium">
            Badge
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value || undefined}
          >
            <FormControl>
              <SelectTrigger className="rounded-full bg-[#0d2818] border-[#0099ff] text-white">
                <SelectValue placeholder="Add a badge for the Product" />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="bg-[#0d2818] border-[#0099ff]">
              <SelectGroup>
                <SelectLabel className="text-[#67e8f9]">Badge</SelectLabel>
                <SelectItem
                  value="new_product"
                  className="text-white focus:bg-[#1a3a2e]"
                >
                  New Product
                </SelectItem>
                <SelectItem
                  value="best_sale"
                  className="text-white focus:bg-[#1a3a2e]"
                >
                  Best Sale
                </SelectItem>
                <SelectItem
                  value="featured"
                  className="text-white focus:bg-[#1a3a2e]"
                >
                  Featured
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <FormDescription className="text-[#67e8f9]">
            Select a Badge if you want the Product card attached a badge.
          </FormDescription>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
}

export default BadgeSelectField;
