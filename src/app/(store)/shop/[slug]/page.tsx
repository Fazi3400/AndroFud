import { Suspense } from "react";
import { Shell } from "@/components/layouts/Shell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AddProductToCartForm } from "@/features/carts";
import { ProductCommentsSection } from "@/features/comments";
import { BuyNowButton, ProductImageShowcase } from "@/features/products";
import { gql } from "@/gql";
import { getClient } from "@/lib/urql";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};
export const metadata: Metadata = {
  title: `androfud | Premium Ecommerce Store`,
  description: "Discover premium products at androfud",
};

const ProductDetailPageQuery = gql(/* GraphQL */ `
  query ProductDetailPageQuery($productSlug: String) {
    productsCollection(filter: { slug: { eq: $productSlug } }) {
      edges {
        node {
          id
          name
          description
          rating
          price
          tags
          totalComments
          ...ProductImageShowcaseFragment
          commentsCollection(first: 5) {
            edges {
              node {
                ...ProductCommentsSectionFragment
              }
            }
          }
          collections {
            id
            label
            slug
          }
        }
      }
    }
    recommendations: productsCollection(first: 4) {
      edges {
        node {
          id
          ...ProductCardFragment
        }
      }
    }
  }
`);

async function ProductDetailPage({ params }: Props) {
  const { data } = await getClient().query(ProductDetailPageQuery, {
    productSlug: params.slug as string,
  });

  if (!data || !data.productsCollection || !data.productsCollection.edges)
    return notFound();

  const {
    id,
    name,
    description,
    price,
    rating,
    tags,
    commentsCollection,
    totalComments,
  } = data.productsCollection.edges[0].node;

  return (
    <main className="bg-[#0a0e27]">
      <Shell>
        {/* Product Details Section */}
        <div className="grid grid-cols-12 gap-8 py-12">
          {/* Product Image */}
          <div className="col-span-12 md:col-span-6">
            <div className="sticky top-20">
              <div className="bg-gradient-to-br from-[#65dcd5] to-[#d8b4fe] rounded-3xl overflow-hidden">
                <ProductImageShowcase
                  data={data.productsCollection.edges[0].node}
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-span-12 md:col-span-6 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {name}
              </h1>

              {/* Rating */}
              {rating && (
                <div className="flex items-center gap-3">
                  <div className="flex text-[#a855f7] text-lg">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(Number(rating))
                          ? "★"
                          : i < Number(rating)
                            ? "⭐"
                            : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400">({rating} Reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-bold text-[#a855f7]">
                  ${Number(price).toFixed(2)}
                </p>
                <p className="text-gray-400 line-through text-lg">
                  ${(Number(price) * 1.2).toFixed(2)}
                </p>
              </div>

              {/* Tags */}
              {tags && Array.isArray(tags) && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#65dcd5] text-[#a855f7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">Description</h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <Suspense>
                  <AddProductToCartForm productId={id} />
                </Suspense>
              </div>
              <div className="flex-1">
                <BuyNowButton productId={id} />
              </div>
            </div>
          </div>
        </div>

        {/* Details Accordion */}
        <div className="py-12 border-t border-[#65dcd5] border-opacity-30">
          <h2 className="text-2xl font-bold text-white mb-6">
            Product Details
          </h2>
          <div className="bg-gradient-to-br from-[#1a3a2e] to-[#0d2818] rounded-2xl border border-[#65dcd5] border-opacity-30 overflow-hidden">
            <Accordion type="single" collapsible className="p-6">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white hover:text-[#a855f7]">
                  Material & Quality
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Crafted from premium materials with exceptional attention to
                  detail. Each product undergoes rigorous quality control to
                  ensure it meets our high standards.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white hover:text-[#a855f7]">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Handle with care. Clean with a soft cloth. Store in a cool,
                  dry place. For specific care instructions, refer to the
                  product tag or contact our support team.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white hover:text-[#a855f7]">
                  Warranty
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  All products come with a 1-year warranty covering
                  manufacturing defects. Extended warranty options available
                  upon request.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Recommendations Section */}
        {data.recommendations && data.recommendations.edges.length > 0 && (
          <div className="py-20 border-t border-[#65dcd5] border-opacity-30">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                You Might Also Like
              </h2>
              <p className="text-gray-400 text-lg">
                Explore our other premium products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.recommendations.edges.map(({ node }: any) => (
                <Link
                  key={node.id}
                  href={`/shop/${node.slug}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-[#1a3a2e] to-[#0d2818] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#d8b4fe]/30 transition-all duration-300 border border-[#65dcd5] border-opacity-30">
                    {/* Placeholder for image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#65dcd5] to-[#d8b4fe]">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        [Product Image]
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-white group-hover:text-[#a855f7] transition-colors line-clamp-2">
                        {node.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-bold text-[#a855f7]">
                          ${Number(node.price).toFixed(2)}
                        </div>
                        <button className="px-3 py-1 rounded-full font-semibold text-white text-xs bg-gradient-to-r from-[#091413] to-[#285A48] hover:shadow-lg transition-all duration-300">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="py-12 border-t border-[#65dcd5] border-opacity-30">
          <ProductCommentsSection
            comments={
              commentsCollection
                ? commentsCollection.edges.map(({ node }: any) => node)
                : []
            }
            totalComments={totalComments}
          />
        </div>
      </Shell>
    </main>
  );
}

export default ProductDetailPage;
