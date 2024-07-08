export const ReviewCardSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full shadow-none p-3 border border-border border-solid rounded-lg gap-2 animate-pulse">
      <div className="flex justify-between animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
            <div className="w-14 h-5 bg-gray-200" />
          </div>

          <div className="bg-gray-200 w-20 h-5" />
        </div>

        <div className="flex gap-2">
          <div className="label3 w-20 h-6 bg-gray-200" />

          <div className="w-7 h-7 border border-border border-solid rounded-full">
            <div className="w-full h-full bg-gray-200 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 animate-pulse">
        <div className="bg-gray-200 w-full h-5" />
        <div className="bg-gray-200 w-full h-5" />
      </div>
    </div>
  );
};
