"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { useAuth } from "@/providers/AuthProvider";
import useCartActions from "../hooks/useCartActions";
import { AddProductCartData, AddProductToCartSchema } from "../validations";

interface AddProductToCartFormProps {
  productId: string;
}

function AddProductToCartForm({ productId }: AddProductToCartFormProps) {
  const { user } = useAuth();
  const { addProductToCart } = useCartActions(user, productId);

  const form = useForm<AddProductCartData>({
    resolver: zodResolver(AddProductToCartSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  async function onSubmit(values: AddProductCartData) {
    addProductToCart(values.quantity);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Button type="submit" variant="primary" className="w-full">
          Add to Cart
        </Button>
      </form>
    </Form>
  );
}

export default AddProductToCartForm;
