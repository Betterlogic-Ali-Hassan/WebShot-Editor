import React from "react";

const OptionsTabs = () => {
  return (
    <div className='grid grid-cols-3 w-full mb-6'>
      <div className='border-b  text-center border-[#00000026]'>
        <h4 className='h-[48px] flex items-center justify-center text-sm font-semibold text-[#999] cursor-pointer'>
          Capture Preferences
        </h4>
      </div>
      <div className='border-b  text-center border-black'>
        <h4 className='h-[48px] flex items-center justify-center text-sm font-semibold text-black cursor-pointer'>
          Record Preferences
        </h4>
      </div>
      <div className='border-b  text-center border-[#00000026]'>
        <h4 className='h-[48px] flex items-center justify-center text-sm font-semibold text-[#999] cursor-pointer'>
          Saving Preferences
        </h4>
      </div>
    </div>
  );
};

export default OptionsTabs;
