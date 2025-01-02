"use client";
import InputWithBtn from "@/components/editor/InputWithBtn";
import React from "react";

const ScreenShot = () => {
  const renderInputWithLabel = (label: string, unit: string, val: number) => (
    <div className='flex items-center justify-between border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727] mb-8'>
      <h3 className='text-[15px] flex flex-col'>{label}</h3>
      <InputWithBtn
        unit={unit}
        val={val}
        className='max-w-[100px]'
        InputWidth=' max-w-[28px]'
      />
    </div>
  );
  return (
    <>
      {renderInputWithLabel("Delayed screenshot time (secs)", "s", 12)}
      {renderInputWithLabel("Page scrolling delay time (ms)", "ms", 12)}
      {renderInputWithLabel("Color depth filter (1 - disabled)", "px", 12)}
    </>
  );
};

export default ScreenShot;
