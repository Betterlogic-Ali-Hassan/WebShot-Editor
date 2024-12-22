import { Skeleton } from "@/components/ui/skeleton";

const BrowserSkeleton = () => {
  return (
    <>
      <div className='space-y-2'>
        <Skeleton className='h-[53px] w-[200px] rounded-md' />
        <Skeleton className='h-[53px] w-[200px] rounded-md' />
      </div>

      <div className='space-y-2'>
        <Skeleton className='h-10 w-full rounded' />
        <Skeleton className='h-10 w-full rounded' />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between py-1'>
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-5 w-5 rounded' />
        </div>
        <div className='flex items-center justify-between pb-1.5'>
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-5 w-5 rounded' />
        </div>
      </div>
    </>
  );
};

export default BrowserSkeleton;
