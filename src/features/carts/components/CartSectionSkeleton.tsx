import { Skeleton } from "../../../components/ui/skeleton";

const CartSectionSkeleton = () => (
  <section
    className="grid grid-cols-12 gap-x-6 gap-y-5"
    aria-label="Loading Skeleton"
  >
    <div className="col-span-12 md:col-span-9 space-y-8 max-h-[420px] md:max-h-[640px] overflow-y-auto">
      {[...Array(4)].map((_, index) => (
        <div
          className="flex items-center justify-between gap-x-6 gap-y-8 border-b border-[#0099ff] border-opacity-30 bg-gradient-to-br from-[#1a3a2e] to-[#0d2818] p-5 rounded-xl"
          key={index}
        >
          <Skeleton className="h-[120px] w-[120px] bg-[#0099ff]" />
          <div className="space-y-3 w-full">
            <Skeleton className="h-6 max-w-xs bg-[#0099ff]" />
            <Skeleton className="h-4 bg-[#0099ff]" />
            <Skeleton className="h-4 w-full max-w-xl bg-[#0099ff]" />
            <Skeleton className="h-4 w-full max-w-lg bg-[#0099ff]" />
          </div>
        </div>
      ))}
    </div>
    <div className="w-full h-full px-3 col-span-12 md:col-span-3 border border-[#0099ff] border-opacity-30 bg-gradient-to-br from-[#1a3a2e] to-[#0d2818] p-5 rounded-xl">
      <div className="space-y-3 w-full">
        <Skeleton className="h-6 max-w-xs bg-[#0099ff]" />
        <Skeleton className="h-4 bg-[#0099ff]" />
        <Skeleton className="h-4 mb-6 bg-[#0099ff]" />
        <Skeleton className="h-4 mb-6 max-w-[280px] bg-[#0099ff]" />
      </div>
    </div>
  </section>
);

export default CartSectionSkeleton;
