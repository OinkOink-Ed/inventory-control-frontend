import { Skeleton } from "@/components/ui/skeleton";

export default function LoginSkeleton() {
  return (
    <div className="flex h-svh justify-center">
      <Skeleton className="h-[304px] w-[320px] flex-col space-y-8 self-center rounded-lg p-8">
        <div className="h-[80px] space-y-2">
          <Skeleton className="h-[20px] w-[41px]"></Skeleton>
          <Skeleton className="h-[36px] w-[252px]"></Skeleton>
        </div>
        <div className="h-[80px] space-y-2">
          <Skeleton className="h-[20px] w-[41px]"></Skeleton>
          <Skeleton className="h-[36px] w-[252px]"></Skeleton>
        </div>
        <Skeleton className="h-[36px] w-[78px]"></Skeleton>
      </Skeleton>
    </div>
  );
}
