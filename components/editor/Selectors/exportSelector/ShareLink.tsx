import React, { useState } from "react";

const ShareLink = () => {
  const [copy, setCopy] = useState(false);
  const handleCopy = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };
  return (
    <div className='w-full relative'>
      <h4 className='text-base font-medium text-primary mb-3.5'>
        Share Link To Your Friends
      </h4>
      <div className='relative rounded-xl flex items-center mt-6 min-h-[54px] px-4 bg-white w-full border max-[490px]:w-[95vw]'>
        <input
          readOnly
          className='w-full px-0.5 outline-none text-dark bg-transparent '
          type='text'
          value='https://similarwatch.com/tv/english-teacher-2024/trailer/'
        />
        <button
          className='absolute text-sm font-medium -translate-y-1/2 top-1/2 right-2 min-h-[36px] bg-brand-default text-white bg-[#6eda78] rounded-3xl px-4'
          onClick={handleCopy}
        >
          {copy ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default ShareLink;
