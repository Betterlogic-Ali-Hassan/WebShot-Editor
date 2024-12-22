import ProgressBar from "@/components/ProgressBar";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const ShareLink = () => {
  const [copy, setCopy] = useState(false);
  const [progressComplete, setProgressComplete] = useState(false);
  const handleProgressComplete = () => {
    setProgressComplete(true);
  };
  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };
  return (
    <>
      <div className='w-full relative py-6 p-4'>
        <h4 className='text-base font-medium text-primary'>
          Share Link To Your Friends
        </h4>
        <div className='relative rounded-xl flex items-center mt-2 min-h-[54px] px-4 bg-white w-full border max-[490px]:w-[95vw]'>
          <input
            readOnly
            className='w-full px-0.5 outline-none text-dark bg-transparent '
            type='text'
            value='https://similarwatch.com/tv/english-teacher-2024/trailer/'
          />
          <button
            className={cn(
              "absolute text-sm font-medium -translate-y-1/2 top-1/2 right-2 min-h-[36px] bg-brand-default  bg-[#f4f4f4] rounded-3xl disabled:cursor-not-allowed px-4 transition duration-150",
              progressComplete && "bg-[#6eda78] text-white"
            )}
            disabled={!progressComplete}
            onClick={handleCopy}
          >
            {copy ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <ProgressBar text onProgressComplete={handleProgressComplete} />
    </>
  );
};

export default ShareLink;
