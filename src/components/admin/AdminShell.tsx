import React, { ReactNode } from "react";
import BackButton from "../layouts/BackButton";

type AdminShellProps = {
  heading: string;
  description: string;
  showBackButton?: boolean;
  children: ReactNode;
};

function AdminShell({
  heading,
  description,
  showBackButton,
  children,
}: AdminShellProps) {
  return (
    <section className="bg-black min-h-screen">
      <div className="flex gap-x-3 mb-5 pb-3 border-b border-[#0099ff]">
        {showBackButton && <BackButton />}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold w-[480px] mb-2 leading-tight text-[#a855f7]">
              {heading}
            </h1>
            <p className="max-w-xl text-[#67e8f9] text-md w-[580px] leading-tight">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

export default AdminShell;
