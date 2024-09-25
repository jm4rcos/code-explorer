import { Skeleton } from './ui/skeleton';

export const EditorSkeleton = () => {
  return (
    /* From Uiverse.io by sahilxkhadka */
    <div className="relative flex w-full h-full flex-col gap-20 p-4">
      <div className="w-1/2 max-w-xl lg:p-10 p-0 flex items-center gap-2">
        <Skeleton className="h-4 w-4 bg-border rounded-full" />
        <Skeleton className="h-4 w-1/6 rounded-lg bg-border" />
        <Skeleton className="h-4 w-4 bg-border rounded-full" />
        <Skeleton className="h-4 w-4/6 rounded-lg bg-border" />
      </div>

      <div className="w-full gap-8 items-center justify-center flex flex-col">
        <div className="w-1/2 max-w-xl flex flex-col items- gap-2">
          <Skeleton className="h-7 w-full rounded-lg bg-border" />
          <Skeleton className="h-7 w-1/2 rounded-lg bg-border" />
        </div>
        <div className="w-1/2 max-w-xl  flex flex-col gap-2">
          <Skeleton className="h-4 w-full rounded-lg bg-border" />
          <Skeleton className="h-4 w-1/2 rounded-lg bg-border" />
        </div>
        <div className="w-1/2 max-w-xl  flex flex-col gap-2">
          <Skeleton className="h-4 w-5/6 rounded-lg bg-border" />
          <Skeleton className="h-24 lg:h-40 w-full rounded-lg bg-border" />
        </div>
        <div className="w-1/2 max-w-xl  flex flex-col gap-2">
          <Skeleton className="h-4 w-full rounded-lg bg-border" />
          <Skeleton className="h-4 w-4/6 rounded-lg bg-border" />
          <Skeleton className="h-4 w-5/6 rounded-lg bg-border" />
          <Skeleton className="h-4 w-full rounded-lg bg-border" />
          <Skeleton className="h-4 w-full rounded-lg bg-border" />
          <Skeleton className="h-4 w-2/4 rounded-lg bg-border" />
          <Skeleton className="h-4 w-full rounded-lg bg-border" />
          <Skeleton className="h-4 w-4/6 rounded-lg bg-border" />
        </div>
      </div>
    </div>
  );
};
