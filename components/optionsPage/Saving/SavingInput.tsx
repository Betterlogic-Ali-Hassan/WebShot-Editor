"use client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const SavingInput = () => {
  const [disabled, setDisabled] = useState(true);
  return (
    <div className='border border-[#dadada] dark:border-[#4a4a4a] px-4 py-[12px] rounded-[12px] dark:bg-[#272727] mb-8'>
      <div className='flex items-center justify-between font-medium'>
        <div className='py-2'>
          <h4>Ask where to save each file before downloading</h4>
          <p className='text-[#9A9A9A] mt-1 text-[13px] font-normal'>
            Note: to use this feature, you need to Allow the extension to manage
            Downloads when permission request window pops up. And only when this
            option is turned on, can you specify default subfolder to save
            screenshots to your local disk. Defaults to the Downloads folder if
            you don’t specify a subfolder.
          </p>
        </div>
        <div className='ml-4'>
          <Switch checked={disabled} onClick={() => setDisabled(!disabled)} />
        </div>
      </div>

      <div
        className={cn(
          "border  flex items-center overflow-hidden rounded-md mt-3 border-[#999]",
          !disabled && "border-[#ccc] text-[#999]"
        )}
      >
        <span className='px-3 bg-secondary border-r h-10 flex items-center justify-center text-sm border-[#999] '>
          Download/
        </span>
        <Input
          className='bg-transparent border-0 shadow-none outline-none px-3'
          placeholder='e.g WebShotScreenshot'
          disabled={!disabled}
        />
      </div>
    </div>
  );
};

export default SavingInput;
