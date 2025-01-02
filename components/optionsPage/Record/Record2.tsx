import React from "react";
import Link from "next/link";
import InputWithBtn from "@/components/editor/InputWithBtn";
import SwitchToggle from "@/components/SwitchToogle";

const Record2 = () => {
  return (
    <>
      <SwitchToggle title='Allow reminder when Microphone is turned off.' />
      <div className='border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727]'>
        <div className='flex items-center justify-between  '>
          <h3 className=' flex flex-col'>
            Countdown Timer
            <span className='text-[#9AA0A6] text-[13px]'>
              Recording will start after the countdown
            </span>
          </h3>
          <InputWithBtn
            unit='s'
            val={2}
            className='max-w-[75px]'
            InputWidth='max-w-[22px]'
          />
        </div>
        <div className='flex items-center justify-between pt-4'>
          <h3>Recording shortcuts </h3>
          <Link
            href='#'
            className='underline text-[15px] hover:text-[#1890ff] transition duration-200'
          >
            Manage
          </Link>
        </div>
      </div>
    </>
  );
};

export default Record2;
