interface Props {
  count?: number;
}

export default function ProductGridSkeleton({ count = 8 }: Props) {
  return (
    <div className="grid grid-cols-2 items-start gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-sm bg-white">
          <div className="aspect-[3/4] w-full animate-pulse bg-gray-100" />
          <div className="space-y-2 p-2 pt-2.5">
            <div className="h-3.5 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
