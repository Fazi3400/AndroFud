"use client";
import { DocumentType, gql } from "@/gql";

import Image from "next/image";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { keytoUrl } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../../../components/layouts/icons";
import { Button } from "../../../components/ui/button";

export const CartItemCardFragment = gql(/* GraphQL */ `
  fragment CartItemCardFragment on products {
    id
    slug
    name
    price
    description
    featuredImage: medias {
      id
      key
      alt
    }
  }
`);

type CartItemCardProps = React.ComponentProps<typeof Card> & {
  product: DocumentType<typeof CartItemCardFragment>;
  removeHandler: () => void;
  quantity: number;
};

function CartItemCard({ product, removeHandler, quantity }: CartItemCardProps) {
  return (
    <Card className="flex items-center justify-between gap-x-6 gap-y-8 px-5 py-3 shadow-none border-0 border-b border-[#0099ff] border-opacity-30 bg-gradient-to-br from-[#1a3a2e] to-[#0d2818] rounded-xl">
      <CardContent className="relative p-0 mb-5 overflow-hidden rounded-lg">
        <Image
          src={keytoUrl(product.featuredImage.key)}
          alt={product.featuredImage.alt}
          width={150}
          height={150}
          className="aspect-square object-cover"
        />
      </CardContent>

      <CardHeader className="p-0 mb-3 md:mb-5 grow max-w-lg">
        <CardTitle className="text-white">
          <Link
            href={`/shop/${product.slug}`}
            className="hover:text-[#a855f7] transition-colors"
          >
            {product.name}
          </Link>
        </CardTitle>

        <CardDescription className="grow line-clamp-2 text-gray-400">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="gap-x-2 md:gap-x-5 p-0 ">
        <p className="text-[#a855f7] font-bold text-lg">$ {product.price}</p>

        <Button
          aria-label="Remove Item Button"
          variant="ghost"
          onClick={removeHandler}
          className="text-white hover:text-red-400"
        >
          <Icons.close size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CartItemCard;
