import Skeleton from "./Skeleton";

const FlightCardSkeleton = () => {
  return (
    <div className="bg-bg-base w-full border border-border-base p-4 rounded-3xl card-shadow">
      <div className="flex gap-2 items-start border-b border-border-strong pb-3 mb-3 border-dashed">
        <div className="flex gap-3 items-center grow">
          <Skeleton className="w-10 h-10 shrink-0 rounded-lg" />

          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
      </div>

      <div className="flex gap-2">
        <div className="w-1/2 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <div className="w-1/2 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
};

export default FlightCardSkeleton;
