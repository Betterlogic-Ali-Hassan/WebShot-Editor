import Link from "next/link";
import React from "react";

const OptionsTabs = () => {
  return (
    <div className='grid grid-cols-3 w-full mb-6'>
      <div className='border-b  text-center border-[#00000026]'>
        <Link
          href='#'
          className='h-[48px] flex items-center justify-center text-[15px] font-semibold text-[#999]'
        >
          Account
        </Link>
      </div>
      <div className='border-b  text-center border-black'>
        <Link
          href='#'
          className='h-[48px] flex items-center justify-center text-[15px] font-semibold text-black'
        >
          Privacy
        </Link>
      </div>
      <div className='border-b  text-center border-[#00000026]'>
        <Link
          href='#'
          className='h-[48px] flex items-center justify-center text-[15px] font-semibold text-[#999]'
        >
          Help
        </Link>
      </div>
    </div>
  );
};

export default OptionsTabs;
