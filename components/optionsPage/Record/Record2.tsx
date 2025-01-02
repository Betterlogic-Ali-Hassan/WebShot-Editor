import React from "react";
import Link from "next/link";
import InputWithBtn from "@/components/editor/InputWithBtn";
import SwitchToggle from "@/components/SwitchToogle";

const Record2 = () => {
  return (
    <>
      <SwitchToggle
        title='Allow reminder when Microphone is turned off.'
        para=' Enable this option to receive reminders if the microphone is turned off during recording. Helps avoid missing audio input unintentionally.'
      />
      <div className='border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727]'>
        <div className='flex items-center justify-between  '>
          <h3 className=' flex flex-col'>
            Countdown Timer
            <p className='text-[#9AA0A6] text-[13px] mt-1'>
              Set the countdown duration (in seconds) before the recording
              begins. This allows preparation time before starting the recording
              process.
            </p>
          </h3>
          <InputWithBtn
            unit='s'
            val={2}
            className='max-w-[75px] '
            InputWidth='max-w-[22px]'
          />
        </div>
        <div className='flex items-center justify-between pt-4'>
          <div>
            <h3>Recording shortcuts </h3>
            <p className='text-[#9AA0A6] mt-1 text-[13px]'>
              Manage and configure keyboard shortcuts for starting, pausing, and
              stopping recordings for efficient operation. (Recording
              Shortcuts) button
            </p>
          </div>
          <Link
            href='#'
            className='underline text-[15px] ml-4 hover:text-[#1890ff] transition duration-200'
          >
            Manage
          </Link>
        </div>
      </div>
    </>
  );
};

export default Record2;
