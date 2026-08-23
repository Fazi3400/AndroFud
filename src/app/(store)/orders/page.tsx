import { Shell } from "@/components/layouts/Shell";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OrdersClient } from "@/components/orders/OrdersClient";

async function OrderPage() {
  const cookieStore = await cookies();
  const supabase = await createClient({ cookieStore });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in?from=/orders");
  }

  try {
    // Fetch orders directly from Supabase
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        amount,
        order_status,
        payment_status,
        payment_method,
        created_at,
        order_lines (
          id,
          products (
            id,
            featured,
            price,
            name,
            slug,
            description
          )
        )
      `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Supabase error:", error);
    }

    // Use empty array if no orders instead of notFound
    const ordersList = orders || [];

    return (
      <Shell layout="narrow">
        <OrdersClient ordersList={ordersList} />
      </Shell>
    );
  } catch (err) {
    console.error("Error fetching orders:", err);

    // Return error UI instead of notFound
    return (
      <Shell layout="narrow">
        <OrdersClient ordersList={[]} />
      </Shell>
    );
  }
}

export default OrderPage;
