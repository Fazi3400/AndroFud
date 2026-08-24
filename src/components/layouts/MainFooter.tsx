import Link from "next/link";
import Branding from "./Branding";

function MainFooter() {
  return (
    <footer className="bg-[#0a0e27] border-t border-[#0099ff]/30 mt-20">
      <div className="container py-12 px-4">
        {/* Row 1: Branding and Nav */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8 pb-8 border-b border-[#0099ff]/30">
          <Branding className="text-2xl" />
          <div className="flex gap-8">
            <Link
              href="/shop"
              className="text-[#67e8f9] hover:text-[#a855f7] hover:neon-text transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="text-[#67e8f9] hover:text-[#a855f7] hover:neon-text transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Row 2: Copyright */}
        <div className="text-center text-sm text-[#67e8f9]">
          <p>&copy; 2026 androfud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
