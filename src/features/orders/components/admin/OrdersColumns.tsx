"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import DeleteDialog from "@/components/ui/deleteDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { gql, DocumentType } from "@/gql";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/layouts/icons";
import { Badge } from "@/components/ui/badge";
import { deleteOrderAction } from "@/_actions/orders";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export const OrderColumnsFragment = gql(/* GraphQL */ `
  fragment OrderColumnsFragment on orders {
    id
    order_status
    payment_status
    order_linesCollection {
      edges {
        node {
          id
          product_id
        }
      }
    }
  }
`);

const DeleteOrderDialog = ({ orderId }: { orderId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const onClickHandler = async () => {
    try {
      await deleteOrderAction(orderId);
      toast({
        title: "Success",
        description: `Order deleted successfully`,
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete order: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      });
    }
  };

  return (
    <DeleteDialog
      onClickHandler={onClickHandler}
      title={`Delete Order ${orderId}?`}
      actionLabel="Delete"
    />
  );
};

const OrdersColumns: ColumnDef<{
  node: DocumentType<typeof OrderColumnsFragment>;
}>[] = [
  {
    accessorKey: "label",
    header: () => <div className="text-left capitalize">Label</div>,
    cell: ({ row }) => {
      const order = row.original.node;

      return (
        <Link
          href={`/admin/orders/${order.id}`}
          className="text-center font-medium capitalize px-3 hover:underline"
        >
          {order.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "order_status",
    header: () => <div className="">Order Status</div>,
    cell: ({ row }) => {
      const order = row.original.node;

      return (
        <div className="font-medium flex items-center gap-3">
          {order.order_status == "pending" ? (
            <Icons.pending size={15} />
          ) : order.order_status == "preparing" ? (
            <Icons.package size={15} />
          ) : (
            ""
          )}
          {order.order_status}
        </div>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: () => <div className="text-left capitalize">Payment Status</div>,
    cell: ({ row }) => {
      const order = row.original.node;

      return (
        <div
          className={cn(
            "font-medium capitalize px-5 py-1 flex items-center",
            order.payment_status == "unpaid"
              ? "text-red-500"
              : "text-green-500",
          )}
        >
          <Badge
            variant="outline"
            className={cn(
              order.payment_status == "unpaid"
                ? "text-red-500 border-red-500"
                : "text-green-500 border-green-500",
            )}
          >
            {order.payment_status}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center capitalize">Actions</div>,
    cell: ({ row }) => {
      const order = row.original.node;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="flex flex-col items-start"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <Link
              href={`/admin/orders/${order.id}`}
              className={buttonVariants({ variant: "ghost" })}
            >
              View Order
            </Link>
            <DeleteOrderDialog orderId={order.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default OrdersColumns;
