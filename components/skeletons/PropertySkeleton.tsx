import { Skeleton } from "@/components/ui/skeleton";

export const PropertyCardSkeleton = () => {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg border border-gray-200">
      {/* Image Skeleton */}
      <Skeleton className="h-48 w-full bg-gray-200" />
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-100" />
        <Skeleton className="h-5 w-1/2 bg-gray-100" />
        {/* Beds, Baths, Area */}
        <div className="flex gap-3">
          <Skeleton className="h-4 w-16 bg-gray-100" />
          <Skeleton className="h-4 w-16 bg-gray-100" />
          <Skeleton className="h-4 w-16 bg-gray-100" />
        </div>
        {/* Address */}
        <Skeleton className="h-4 w-full bg-gray-100" />
        {/* Description */}
        <Skeleton className="h-4 w-full bg-gray-100" />
        <Skeleton className="h-4 w-2/3 bg-gray-100" />
        {/* Features */}
        <div className="flex gap-2 mt-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-100" />
          <Skeleton className="h-6 w-20 rounded-full bg-gray-100" />
          <Skeleton className="h-6 w-14 rounded-full bg-gray-100" />
        </div>
        {/* Button */}
        <Skeleton className="h-10 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};
