import React from "react";
import OptionPageSwitch from "../OptionPageSwitch";
import Link from "next/link";
import InputWithBtn from "@/components/editor/InputWithBtn";

const Record = () => {
  return (
    <div>
      <div className='flex items-center justify-between py-3'>
        <h3 className='text-[15px] flex flex-col'>
          Countdown Timer
          <span className='text-[#9AA0A6] text-[13px]'>
            Recording will start after the countdown
          </span>
        </h3>
        <InputWithBtn
          unit='s'
          val={2}
          className='max-w-[75px]'
          InputWidth='max-w-[50px]'
        />
      </div>
      <div className='py-3'>
        <OptionPageSwitch label='Allow reminder when Microphone is turned off.' />
      </div>
      <div className='flex items-center justify-between py-3'>
        <h3>Recording shortcuts </h3>
        <Link
          href='#'
          className='underline text-[15px] hover:text-[#1890ff] transition duration-200'
        >
          Manage
        </Link>
      </div>
    </div>
  );
};

export default Record;
