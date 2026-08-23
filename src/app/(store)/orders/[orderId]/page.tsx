import { Shell } from "@/components/layouts/Shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type TrackOrderProps = {
  params: { orderId: string };
};

async function TrackOrderPage({ params: { orderId } }: TrackOrderProps) {
  const cookieStore = await cookies();
  const supabase = await createClient({ cookieStore });

  const { data: order, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      amount,
      currency,
      order_status,
      payment_status,
      payment_method,
      created_at,
      order_lines (
        id,
        quantity,
        price,
        products (
          id,
          name,
          price
        )
      )
    `,
    )
    .eq("id", orderId)
    .single();

  if (error || !order) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const statusColor = {
    paid: "text-green-400",
    unpaid: "text-yellow-400",
    no_payment_required: "text-blue-400",
  }[order.payment_status as keyof typeof statusColor] || "text-gray-400";

  const paymentMethodLabel = order.payment_method === "crypto" ? "₿ Crypto" : "💳 Card";

  return (
    <Shell layout="narrow">
      <div className="min-h-screen bg-black space-y-8 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#a855f7]">Order Details</h1>
          <div className="flex items-center gap-4">
            <p className="text-[#d9fff4]">
              <span className="font-semibold">Order ID:</span> #{orderId.substring(0, 8)}
            </p>
            <p className={`font-semibold capitalize ${statusColor}`}>
              {order.payment_status}
            </p>
            <p className="text-[#d9fff4]">{paymentMethodLabel}</p>
          </div>
        </div>

        <div className="h-0.5 bg-gradient-to-r from-[#65dcd5] to-transparent"></div>

        <div className="grid grid-cols-12 gap-x-5">
          <section className="col-span-12 space-y-6">
            {/* Order Summary */}
            <Card className="bg-[#0d2818] border-[#65dcd5]">
              <CardHeader className="text-[#a855f7] font-semibold">Order Summary</CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[#d9fff4] font-medium">Order Date</p>
                    <p className="text-sm text-[#a855f7]">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#d9fff4] font-medium">Total Amount</p>
                    <p className="text-sm text-[#a855f7]">
                      {order.currency?.toUpperCase()} {Number(order.amount).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#d9fff4] font-medium">Payment Status</p>
                    <p className={`text-sm font-semibold capitalize ${statusColor}`}>
                      {order.payment_status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#d9fff4] font-medium">Order Status</p>
                    <p className="text-sm text-[#a855f7] capitalize">
                      {order.order_status || "Pending"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-[#0d2818] border-[#65dcd5]">
              <CardHeader className="text-[#a855f7] font-semibold">Items</CardHeader>
              <CardContent className="space-y-4">
                {order.order_lines && order.order_lines.length > 0 ? (
                  order.order_lines.map((line: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center pb-4 border-b border-[#65dcd5] last:border-b-0"
                    >
                      <div>
                        <p className="text-sm text-[#a855f7]">{line.products?.name || "Product"}</p>
                        <p className="text-xs text-[#d9fff4]">Qty: {line.quantity}</p>
                      </div>
                      <p className="text-sm text-[#a855f7]">
                        {order.currency?.toUpperCase()} {Number(line.price).toFixed(2)} each
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#d9fff4]">No items in this order</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Shell>
  );
}

export default TrackOrderPage;
