import { CartSheet } from "@/features/carts";
import MainFooter from "@/components/layouts/MainFooter";
import Navbar from "@/components/layouts/MainNavbar";
import { FloatingContactButton } from "@/components/layouts/FloatingContactButton";
import { ReactNode } from "react";

type Props = { children: ReactNode };

async function StoreLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="pt-[50px] bg-[#0a0e27]">{children}</main>
      <CartSheet />
      <MainFooter />
      <FloatingContactButton />
    </>
  );
}

export default StoreLayout;

