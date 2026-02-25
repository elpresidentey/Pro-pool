export default function CardSkeleton() {
  return (
    <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse flex flex-col">
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-gray-300 flex-shrink-0"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Name Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Category & Location Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Badges Skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
          <div className="h-5 bg-gray-300 rounded-full w-16"></div>
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-300 rounded w-12 ml-auto"></div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
