"use client";

import { createProductAction, updateProductAction } from "@/_actions/products";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import TagsField from "@/components/ui/tagsField";
import { useToast } from "@/components/ui/use-toast";
import { BadgeSelectField } from "@/features/cms";
import { ImageDialog } from "@/features/medias";
import {
  InsertProducts,
  SelectProducts,
  products,
} from "@/lib/supabase/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@urql/next";
import { createInsertSchema } from "drizzle-zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useTransition } from "react";
import { useForm } from "react-hook-form";

type ProductsFormProps = {
  product?: SelectProducts;
};

function ProductFrom({ product }: ProductsFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<InsertProducts>({
    resolver: zodResolver(createInsertSchema(products)),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      badge: product?.badge || undefined,
      rating: product?.rating || "4",
      price: product?.price || "0.00",
      tags: product?.tags || [],
      images: product?.images || [],
      featuredImageId: product?.featuredImageId || "",
      featured: product?.featured || false,
      stock: product?.stock || 8,
      totalComments: product?.totalComments || 0,
    },
  });

  const {
    register,
    control,
    handleSubmit,
  } = form;

  const onSubmit = handleSubmit(async (formData: InsertProducts) => {
    startTransition(async () => {
      try {
        // Ensure all required fields have proper values before submission
        const cleanedData: InsertProducts = {
          ...formData,
          tags: Array.isArray(formData.tags) ? formData.tags : [],
          images: Array.isArray(formData.images) ? formData.images : [],
          rating: String(formData.rating || "4"),
          price: String(formData.price || "0.00"),
          featured: Boolean(formData.featured),
          totalComments: Number(formData.totalComments || 0),
          stock: Number(formData.stock || 8),
        };

        product
          ? await updateProductAction(product.id, cleanedData)
          : await createProductAction(cleanedData);

        router.push("/admin/products");
        router.refresh();

        toast({
          title: `Product is ${product ? "updated" : "created"}.`,
          description: `${cleanedData.name}`,
        });
      } catch (err) {
        console.error("Product creation error:", err);
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to save product",
          variant: "destructive",
        });
      }
    });
  });

  return (
    <Form {...form}>
      <form
        id="project-form"
        className="gap-x-5 flex gap-y-5 flex-col px-8 py-8 bg-black min-h-screen"
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-2 gap-6 max-w-6xl">
          <FormItem>
            <FormLabel className="text-[#a855f7] text-sm font-medium">Name*</FormLabel>
            <FormControl>
              <Input
                aria-invalid={!!form.formState.errors.name}
                placeholder="Type Product Name."
                className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                {...register("name")}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>

          <FormItem>
            <FormLabel className="text-[#a855f7] text-sm font-medium">Slug*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.slug}
                aria-invalid={!!form.formState.errors.slug}
                placeholder="Type Product slug."
                className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                {...register("slug")}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>

          <div className="col-span-2">
            <FormItem>
              <FormLabel className="text-[#a855f7] text-sm font-medium">Description*</FormLabel>
              <FormControl>
                <Input
                  defaultValue={product?.description || ""}
                  aria-invalid={!!form.formState.errors.description}
                  placeholder="Type a short description for the product.."
                  className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                  {...register("description")}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          </div>

          <BadgeSelectField name="badge" label={""} />

          <FormItem>
            <FormLabel className="text-[#a855f7] text-sm font-medium">Rating*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.rating}
                aria-invalid={!!form.formState.errors.rating}
                placeholder="Rating (0-5)."
                className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                {...register("rating")}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>

          <FormItem>
            <FormLabel className="text-[#a855f7] text-sm font-medium">Price*</FormLabel>
            <FormControl>
              <Input
                defaultValue={product?.price}
                aria-invalid={!!form.formState.errors.price}
                placeholder="Price"
                className="rounded-full bg-[#0d2818] border-[#0099ff] text-white placeholder-gray-500 focus:border-[#d8b4fe]"
                {...register("price")}
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>

          <div className="col-span-2">
            <FormItem>
              <FormLabel className="text-[#a855f7] text-sm font-medium">Tags</FormLabel>
              <FormControl>
                <TagsField name={"tags"} defaultValue={product?.tags || []} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="featuredImageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#a855f7] text-sm font-medium">Featured Image*</FormLabel>
                  <Suspense>
                    <ImageDialog
                      defaultValue={product?.featuredImageId}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </Suspense>

                  <FormDescription className="text-[#67e8f9]">
                    Drag n Drop the image to above section or click the button to
                    select from Image gallery.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="py-8 flex gap-x-5 items-center">
          <Button
            disabled={isPending}
            form="project-form"
            className="rounded-full bg-[#d8b4fe] hover:bg-[#0099ff] text-white px-8"
          >
            {product ? "Update" : "Create"}
            {isPending && (
              <Spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
          </Button>
          <Link href="/admin/products" className={buttonVariants({ className: "rounded-full bg-gray-600 hover:bg-gray-700 text-white px-8" })}>
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default ProductFrom;
