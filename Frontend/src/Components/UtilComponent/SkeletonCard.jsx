//it show skeleton cart rather then buffering on the frontend when we hit your item page and the server takes time to fetch the data 
const SkeletonCard = () => (
  <div className="bg-white border border-slate-50 rounded-[2.5rem] p-4 shadow-sm">
    {/* Image Area Skeleton */}
    <div className="relative h-60 bg-slate-100 rounded-[2rem] mb-5 overflow-hidden">
        <div className="w-full h-full animate-shimmer" />
        {/* Mock Badge */}
        <div className="absolute top-4 left-4 w-16 h-5 bg-slate-200 rounded-full animate-pulse" />
    </div>

    <div className="px-2">
      {/* Title & Price Skeleton */}
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-3 w-full">
          <div className="h-6 bg-slate-200 rounded-lg w-3/4 animate-shimmer" />
          <div className="h-4 bg-slate-100 rounded-md w-1/4 animate-shimmer" />
        </div>
        <div className="w-6 h-6 bg-slate-50 rounded-full" />
      </div>

      {/* Mini Stats Grid Skeleton */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-16 bg-slate-50 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-2 bg-slate-200 rounded animate-pulse" />
            <div className="w-12 h-1.5 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="h-16 bg-slate-50 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-2 bg-slate-200 rounded animate-pulse" />
            <div className="w-12 h-1.5 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-2">
        <div className="flex-grow h-14 bg-slate-100 rounded-xl animate-shimmer" />
        <div className="w-14 h-14 bg-red-50/50 rounded-xl border border-red-50" />
      </div>
    </div>
  </div>
);

export default SkeletonCard