import Link from "next/link";
import React from "react";

const OptionPageCard = () => {
  return (
    <div className='min-h-screen flex flex-grow flex-col max-w-[640px] w-[640px]'>
      <div className='flex items-center w-full min-h-[60px] top-0 sticky justify-center'>
        <Link
          href='#'
          className='p-2 max-w-full text-base font-semibold relative'
        >
          Settings
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default OptionPageCard;
